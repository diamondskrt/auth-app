import { ThemeProvider } from '~/shared/lib/theme'

interface Providers {
  children: React.ReactNode
}

export function Providers({ children }: Providers) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="auth-app-ui-theme">
      {children}
    </ThemeProvider>
  )
}
