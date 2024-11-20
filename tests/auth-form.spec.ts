import { test, expect } from '@playwright/test'

test.describe('AuthForm', () => {
  test('should submit the form with valid credentials', async ({ page }) => {
    // Navigate to the page containing the AuthForm
    await page.goto('http://localhost:5173/auth')

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
    // Navigate to the page containing the AuthForm
    await page.goto('http://localhost:5173/auth')

    // Fill in fields with invalid data
    await page.fill('input[name="username"]', 'GOA')
    await page.fill('input[name="password"]', '123456789')

    // Click the submit button
    await page.click('button[type="submit"]')

    // Wait for the error message to appear
    const element = await page.locator('[data-type="error"]')
    await expect(element.locator(':scope', { hasText: '422' })).toBeTruthy()
  })
})
