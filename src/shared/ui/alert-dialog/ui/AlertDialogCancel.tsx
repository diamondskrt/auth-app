import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import { buttonVariants } from '~/shared/ui/button'

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className
    )}
    {...props}
  />
))

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export { AlertDialogCancel }
