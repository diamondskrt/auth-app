import { Outlet } from 'react-router-dom'

import { AppSidebar } from '~/shared/ui/app-sidebar'
import { SidebarProvider } from '~/shared/ui/sidebar'

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container py-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
