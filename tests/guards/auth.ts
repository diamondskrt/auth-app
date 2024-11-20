import { test } from '@playwright/test'

import { profile } from '../config'
import { mockJSONAPIResponse } from '../lib'

const authBeforeEach = () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth-app/accessToken',
        value: '123',
        domain: 'localhost',
        path: '/',
      },
      {
        name: 'auth-app/refreshToken',
        value: '123',
        domain: 'localhost',
        path: '/',
      },
    ])

    await mockJSONAPIResponse({
      page,
      url: '**/v1/profile',
      status: 200,
      body: JSON.stringify(profile),
    })
  })
}

export { authBeforeEach }
