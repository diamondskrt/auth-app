import Cookies from 'js-cookie'

import { AuthResponseSchema } from '~/shared/api/auth'
import { dayjs } from '~/shared/lib/date'

export function setTokens(data: AuthResponseSchema) {
  const {
    accessToken,
    accessTokenExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
  } = data.data
  Cookies.set('accessToken', accessToken, {
    expires: dayjs(accessTokenExpiresAt).toDate(),
  })
  Cookies.set('refreshToken', refreshToken, {
    expires: dayjs(refreshTokenExpiresAt).toDate(),
  })
}
