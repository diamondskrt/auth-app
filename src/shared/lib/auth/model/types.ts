type AccessTokenParams = {
  accessToken: string
  expires: Date
}

type RefreshTokenParams = {
  refreshToken: string
  expires: Date
}

interface AuthProviderContextType {
  isAuthenticated: boolean
  setAccessToken: ({ accessToken, expires }: AccessTokenParams) => void
  removeAccessToken: () => void
  setRefreshToken: ({ refreshToken, expires }: RefreshTokenParams) => void
  removeRefreshToken: () => void
  clearTokens: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

export type {
  AccessTokenParams,
  RefreshTokenParams,
  AuthProviderContextType,
  AuthProviderProps,
}
