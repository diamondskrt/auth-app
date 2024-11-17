import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
})

BreadcrumbLink.displayName = 'BreadcrumbLink'

export { BreadcrumbLink }
