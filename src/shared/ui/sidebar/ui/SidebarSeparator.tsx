import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import { Separator } from '~/shared/ui/separator'

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  )
})

SidebarSeparator.displayName = 'SidebarSeparator'

export { SidebarSeparator }