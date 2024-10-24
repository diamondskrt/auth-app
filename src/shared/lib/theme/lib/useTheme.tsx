import { useContext } from 'react'

import { ThemeProviderContext } from '../config'

const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  const isDarkTheme = context.theme === 'dark'
  const isLightTheme = context.theme === 'light'

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return {
    isDarkTheme,
    isLightTheme,
    ...context,
  }
}

export { useTheme }
