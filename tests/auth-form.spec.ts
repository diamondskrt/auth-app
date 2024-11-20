import { test, expect } from '@playwright/test'

import { mockResponse } from './lib'

test.describe('AuthForm', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page containing the AuthForm
    await page.goto('./auth')
  })

  test('should submit the form with valid credentials', async ({ page }) => {
    // Mock the server response for a successful login
    await mockResponse({
      page,
      url: '**/auth/token',
      status: 200,
      body: JSON.stringify({ message: 'Login successful' }),
    })

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
    await mockResponse({
      page,
      url: '**/auth/token',
      status: 422,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    })

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
