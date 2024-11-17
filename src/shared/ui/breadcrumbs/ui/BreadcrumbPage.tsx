import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))

BreadcrumbPage.displayName = 'BreadcrumbPage'

export { BreadcrumbPage }