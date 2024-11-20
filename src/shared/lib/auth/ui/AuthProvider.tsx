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
    Boolean(Cookies.get('auth-app/accessToken'))
  )

  const setAccessToken = ({ accessToken, expires }: AccessTokenParams) => {
    Cookies.set('auth-app/accessToken', accessToken, { expires })
    setIsAuthenticated(true)
  }

  const removeAccessToken = () => {
    Cookies.remove('auth-app/accessToken')
    setIsAuthenticated(false)
  }

  const setRefreshToken = ({ refreshToken, expires }: RefreshTokenParams) => {
    Cookies.set('auth-app/refreshToken', refreshToken, { expires })
  }

  const removeRefreshToken = () => {
    Cookies.remove('auth-app/refreshToken')
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
