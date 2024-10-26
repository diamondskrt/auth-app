import Cookies from 'js-cookie'

import { dayjs } from '~/shared/lib/date'

import { SetTokenParams } from '../model'

export function setTokens({
  accessToken,
  accessTokenExpiresAt,
  refreshToken,
  refreshTokenExpiresAt,
}: SetTokenParams) {
  Cookies.set('accessToken', accessToken, {
    expires: dayjs(accessTokenExpiresAt).toDate(),
  })
  Cookies.set('refreshToken', refreshToken, {
    expires: dayjs(refreshTokenExpiresAt).toDate(),
  })
}
