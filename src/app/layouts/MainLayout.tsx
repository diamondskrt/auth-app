import { AppSidebar } from '~/shared/ui/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '~/shared/ui/sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="container">{children}</div>
      </main>
    </SidebarProvider>
  )
}
