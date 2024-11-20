import { test } from '@playwright/test'
import Cookies from 'js-cookie'

const verifyJson = {
  data: { tokenableId: '9c3a6d3e-dbd6-4436-aa1e-5df51dd2e961' },
}

const profileJson = {
  data: {
    id: '9c3a6d3e-dbd6-4436-aa1e-5df51dd2e961',
    email: 'test@example.com',
    fullName: 'GOA',
    username: 'GOA',
    phone: null,
    merchantCode: 'GOA',
    isAdmin: true,
    additionalData: null,
    abilityGroups: ['admin'],
  },
}

const authBeforeEach = () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Cookies.set('auth-app/accessToken', '123')
      Cookies.set('auth-app/refreshToken', '123')
    })

    await page.route('**/auth/verify', (route) =>
      route.fulfill({ json: verifyJson })
    )

    await page.route('**/v1/profile', (route) =>
      route.fulfill({ json: profileJson })
    )
  })
}

export { authBeforeEach }
