import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ThemeProvider } from '~/shared/lib/theme'

interface Providers {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: Providers) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="auth-app-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
