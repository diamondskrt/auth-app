import { MockResponseParams } from '../model'

const mockJSONAPIResponse = ({ page, url, status, body }: MockResponseParams) =>
  page.route(url, (route) => {
    route.fulfill({
      status,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
      body,
    })
  })

const mockResponse = ({ page, url, status, body }: MockResponseParams) =>
  page.route(url, (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body,
    })
  })

export { mockJSONAPIResponse, mockResponse }
