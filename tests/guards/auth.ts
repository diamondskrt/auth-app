import { test } from '@playwright/test'

const profile = {
  data: {
    id: '123',
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

const abilityGroups = {
  data: [
    {
      type: 'ability-groups',
      id: '111',
      attributes: {
        name: 'admin',
        description: 'admin',
      },
    },
    {
      type: 'ability-groups',
      id: '222',
      attributes: {
        name: 'operator',
        description: 'operator',
      },
    },
    {
      type: 'ability-groups',
      id: '333',
      attributes: {
        name: 'merchant',
        description: 'merchant',
      },
    },
    {
      type: 'ability-groups',
      id: '4444',
      attributes: {
        name: 'worker',
        description: 'worker',
      },
    },
  ],
}

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

    await page.route('**/v1/profile', (route) =>
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        body: JSON.stringify(profile),
      })
    )

    await page.route('**/v1/ability-groups', (route) => {
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        body: JSON.stringify(abilityGroups),
      })
    })
  })
}

export { authBeforeEach }
