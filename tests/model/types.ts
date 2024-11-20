import { Page } from '@playwright/test'

type MockResponseParams = {
  page: Page
  url: string
  status: number
  body?: string | Buffer
}

export type { MockResponseParams }
