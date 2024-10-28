import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import { Input } from '~/shared/ui/input'

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className
      )}
      {...props}
    />
  )
})

SidebarInput.displayName = 'SidebarInput'

export { SidebarInput }