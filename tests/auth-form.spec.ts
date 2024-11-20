import { test, expect } from '@playwright/test'

test.describe('AuthForm', () => {
  test('should submit the form with valid credentials', async ({ page }) => {
    // Mock the server response for a successful login
    await page.route('**/auth/token', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Login successful' }),
      })
    })

    // Navigate to the page containing the AuthForm
    await page.goto('./auth')

    // Fill in fields
    await page.fill('input[name="username"]', 'GOA')
    await page.fill('input[name="password"]', '12345678')

    // Click the submit button
    await page.click('button[type="submit"]')

    // Wait for the success message to appear
    const element = await page.locator('[data-type="success"]')
    await expect(
      element.locator(':scope', { hasText: 'Login successful' })
    ).toBeTruthy()
  })

  test('should show error message with invalid credentials', async ({
    page,
  }) => {
    // Mock the server response for an invalid login
    await page.route('**/auth/token', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' }),
      })
    })

    // Navigate to the page containing the AuthForm
    await page.goto('./auth')

    // Fill in fields with invalid data
    await page.fill('input[name="username"]', 'GOA')
    await page.fill('input[name="password"]', '123456789')

    // Click the submit button
    await page.click('button[type="submit"]')

    // Wait for the error message to appear
    const element = await page.locator('[data-type="error"]')
    await expect(
      element.locator(':scope', { hasText: 'Invalid credentials' })
    ).toBeTruthy()
  })
})
