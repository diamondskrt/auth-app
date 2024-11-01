import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import { buttonVariants } from '~/shared/ui/button'

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

export { AlertDialogAction }
