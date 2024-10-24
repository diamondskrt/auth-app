import { createContext } from 'react'

import { ThemeProviderState } from '../model'

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: 'system',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export { ThemeProviderContext }
