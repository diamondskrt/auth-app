import * as SheetPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))

SheetDescription.displayName = SheetPrimitive.Description.displayName

export { SheetDescription }
