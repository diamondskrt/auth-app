import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { commandItemClassName } from '../config'

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(commandItemClassName, className)}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

export { CommandItem }
