import { test, expect } from '@playwright/test'

import { abilityGroups } from './config'
import { authBeforeEach } from './guards'
import { mockJSONAPIResponse } from './lib'

test.describe('UserForm', () => {
  authBeforeEach()

  test.beforeEach(async ({ page }) => {
    // Mock the server get ability-groups response
    await mockJSONAPIResponse({
      page,
      url: '**/v1/ability-groups',
      status: 200,
      body: JSON.stringify(abilityGroups),
    })

    // Intercept response
    const getAbilityGroupsPromise = page.waitForResponse('**/v1/ability-groups')

    // Navigate to the page containing the UserForm
    await page.goto('./users/create')

    // Wait for the response to ensure the ability groups are loaded
    await getAbilityGroupsPromise
  })

  test('should submit the form with valid data', async ({ page }) => {
    // Mock the server response for a successful form submission
    await mockJSONAPIResponse({
      page,
      url: '**/v1/users',
      status: 200,
      body: JSON.stringify({ message: 'User has been created' }),
    })

    // Fill in fields
    await page.fill('input[name="fullName"]', 'John Doe')
    await page.fill('input[name="username"]', 'johndoe')
    await page.fill('input[name="email"]', 'john.doe@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.fill('input[name="merchantCode"]', 'MERCHANT123')
    await page.fill('input[name="password"]', 'securepassword')
    await page.click('div.select-multiple')
    await page.click('div[role="option"]:has-text("admin")')

    // Click the submit button
    await page.click('button[type="submit"]', { force: true })

    // Wait for the success message to appear
    const element = await page.locator('[data-type="success"]')
    await expect(
      element.locator(':scope', { hasText: 'User has been created' })
    ).toBeTruthy()
  })

  test('should show error message with invalid data', async ({ page }) => {
    // Mock the server response for an invalid form submission
    await mockJSONAPIResponse({
      page,
      url: '**/v1/users',
      status: 422,
      body: JSON.stringify({ error: 'Invalid data' }),
    })

    // Fill in fields with invalid data
    await page.fill('input[name="fullName"]', 'John Doe')
    await page.fill('input[name="username"]', 'johndoe')
    await page.fill('input[name="email"]', 'john.doe@example.com')
    await page.fill('input[name="phone"]', 'invalid-phone')
    await page.fill('input[name="merchantCode"]', 'MERCHANT123')

    // Click the submit button
    await page.click('button[type="submit"]')

    // Wait for the error message to appear
    const element = await page.locator('[data-type="error"]')
    await expect(
      element.locator(':scope', { hasText: 'Invalid data' })
    ).toBeTruthy()
  })
})
