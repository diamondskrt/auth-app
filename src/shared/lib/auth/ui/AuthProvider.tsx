import Cookies from 'js-cookie'
import { useState } from 'react'

import { AuthProviderContext } from '../config'
import {
  AuthProviderProps,
  RefreshTokenParams,
  AccessTokenParams,
} from '../model'

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get('accessToken'))
  )

  const setAccessToken = ({ accessToken, expires }: AccessTokenParams) => {
    Cookies.set('accessToken', accessToken, { expires })
    setIsAuthenticated(true)
  }

  const removeAccessToken = () => {
    Cookies.remove('accessToken')
    setIsAuthenticated(false)
  }

  const setRefreshToken = ({ refreshToken, expires }: RefreshTokenParams) => {
    Cookies.set('refreshToken', refreshToken, { expires })
  }

  const removeRefreshToken = () => {
    Cookies.remove('refreshToken')
  }

  const clearTokens = () => {
    removeAccessToken()
    removeRefreshToken()
  }

  return (
    <AuthProviderContext.Provider
      value={{
        isAuthenticated,
        setAccessToken,
        removeAccessToken,
        setRefreshToken,
        removeRefreshToken,
        clearTokens,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}
