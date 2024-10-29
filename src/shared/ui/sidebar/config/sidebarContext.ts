import { createContext } from 'react'

import { type TSidebarContext } from '../model'

const SidebarContext = createContext<TSidebarContext | null>(null)

export { SidebarContext }
