import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export { DialogTitle }
