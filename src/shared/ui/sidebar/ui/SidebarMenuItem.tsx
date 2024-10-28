import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
))

SidebarMenuItem.displayName = 'SidebarMenuItem'

export { SidebarMenuItem }