import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const PaginationNav = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

PaginationNav.displayName = 'PaginationNav'

export { PaginationNav }
