import { test, expect, Page } from '@playwright/test'

import { testUser, user } from './config'
import { authBeforeEach } from './guards'
import { mockJSONAPIResponse } from './lib'

const waitForSpecificResponse = ({
  page,
  status = 200,
}: {
  page: Page
  status?: number
}) =>
  page.waitForResponse(
    (response) =>
      response.url().includes(`/v1/users/${testUser.id}`) &&
      response.status() === status
  )

test.describe('ShowUserPage', () => {
  authBeforeEach()

  test.beforeEach(async ({ page }) => {
    // Mock the server get user response
    await mockJSONAPIResponse({
      page,
      url: `**/v1/users/${testUser.id}?include=abilityGroups`,
      status: 200,
      body: JSON.stringify(user),
    })

    const getUserPromise = waitForSpecificResponse({ page })

    // Navigate to the ShowUserPage
    await page.goto(`/users/${testUser.id}`)

    // Wait for the user to be loaded
    await getUserPromise
  })

  test('should display user information', async ({ page }) => {
    // Check if the user information is displayed
    await expect(page.locator('.user')).toBeVisible()
    // Should contain user fullname and username
    await expect(page.locator('.user-info')).toContainText(
      user.data.attributes.fullName
    )
    await expect(page.locator('.user-info')).toContainText(
      user.data.attributes.username
    )
  })

  test('should navigate to edit page on Edit button click', async ({
    page,
  }) => {
    // Click the Edit button
    await page.click('text=Edit')

    // Verify navigation to the edit page
    await expect(page).toHaveURL(`/users/${testUser.id}/edit`)
  })

  test('should toggle block/unblock user', async ({ page }) => {
    // Action buttons
    const blockButton = page.locator('button:has-text("Block")')
    const unblockButton = page.locator('button:has-text("Unblock")')
    const isBlocked = await unblockButton.isVisible()

    // Mock the server response
    await mockJSONAPIResponse({
      page,
      url: `**/v1/users/${testUser.id}`,
      status: 200,
      body: JSON.stringify({
        ...user,
        data: {
          ...user.data,
          attributes: {
            ...user.data.attributes,
            isBlocked: isBlocked ? null : new Date().toISOString(),
          },
        },
      }),
    })

    // Intercept response
    const userUpdatePromise = waitForSpecificResponse({ page })

    // Toggle the button
    const buttonToClick = isBlocked ? unblockButton : blockButton
    await buttonToClick.click()

    await userUpdatePromise

    // Verify the success message
    const element = page.locator('[data-type="success"]')
    await expect(
      element.locator(':scope', { hasText: 'User has been updated' })
    ).toBeTruthy()

    // Verify the button state has toggled
    if (isBlocked) {
      await expect(unblockButton).toBeVisible()
    } else {
      await expect(blockButton).toBeVisible()
    }
  })

  test('should open confirm dialog on Delete button click', async ({
    page,
  }) => {
    // Click the Delete button
    await page.click('button:has-text("Delete")')

    // Verify the confirm dialog is open
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible()
  })

  test('should delete user on confirm', async ({ page }) => {
    // Mock the DELETE request
    await mockJSONAPIResponse({
      page,
      url: `**/v1/users/${testUser.id}`,
      status: 204,
    })

    // Click the Delete button
    await page.click('button:has-text("Delete")')

    // Ensure the confirm dialog is visible
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible()

    // Intercept response
    const userDeletePromise = waitForSpecificResponse({
      page,
      status: 204,
    })

    // Confirm the deletion
    await page.click('button:has-text("Confirm")')

    // Wait for the response to ensure the deletion is processed
    await userDeletePromise

    // Wait for the success message to appear
    const element = await page.locator('[data-type="success"]')
    await expect(
      element.locator(':scope', { hasText: 'User has been deleted' })
    ).toBeTruthy()

    // Verify user is redirected after deletion
    await expect(page).toHaveURL('/users')
  })
})
