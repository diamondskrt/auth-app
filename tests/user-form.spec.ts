import { test, expect } from '@playwright/test'

import { authBeforeEach } from './guards'

test.describe('UserForm', () => {
  authBeforeEach()
  test('should submit the form with valid data', async ({ page }) => {
    // Mock the server response for a successful form submission
    await page.route('**/v1/users', (route) => {
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        body: JSON.stringify({ message: 'User has been created' }),
      })
    })

    // Navigate to the page containing the UserForm
    await page.goto('./users/create')

    await page.waitForResponse('**/v1/ability-groups')

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
    await page.route('**/v1/users', (route) => {
      route.fulfill({
        status: 422,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        body: JSON.stringify({ error: 'Invalid data' }),
      })
    })

    // Navigate to the page containing the UserForm
    await page.goto('./users/create')

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
