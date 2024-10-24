import { lazy } from 'react'

import './index.css'
import { AppRouter } from './routers'

const Providers = lazy(() => import('./providers'))

export function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}

export default App
