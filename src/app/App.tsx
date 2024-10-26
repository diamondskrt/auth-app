import { lazy } from 'react'

import { Toaster } from '~/shared/ui/toaster'

import './index.css'
import { AppRouter } from './routers'

const Providers = lazy(() => import('./providers'))

export function App() {
  return (
    <Providers>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </Providers>
  )
}

export default App
