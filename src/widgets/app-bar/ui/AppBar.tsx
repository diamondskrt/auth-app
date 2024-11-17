import { Breadcrumbs, BreadcrumbsItem } from '~/shared/ui/breadcrumbs'
import { SidebarTrigger } from '~/shared/ui/sidebar'
import { Typography } from '~/shared/ui/typography'

type AppBarProps = {
  title: string
  breadcrumbs?: BreadcrumbsItem[]
  Actions?: React.ReactNode
}

export function AppBar({ title, breadcrumbs, Actions }: AppBarProps) {
  return (
    <header className="mb-4">
      <div className="mb-6 flex items-center gap-4">
        <SidebarTrigger />
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
      <div className="flex justify-between">
        <Typography variant="h2">{title}</Typography>
        {Actions}
      </div>
    </header>
  )
}
