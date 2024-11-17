import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
))

CommandSeparator.displayName = CommandPrimitive.Separator.displayName

export { CommandSeparator }
