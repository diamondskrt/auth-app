import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'> & { disabled?: boolean }
>(({ className, disabled, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      'cursor-pointer',
      disabled && 'pointer-events-none opacity-50',
      className
    )}
    {...props}
  />
))

PaginationItem.displayName = 'PaginationItem'

export { PaginationItem }
