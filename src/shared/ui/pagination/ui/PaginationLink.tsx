import { cn } from '~/shared/lib/utils'
import { buttonVariants } from '~/shared/ui/button'

import { PaginationLinkProps } from '../model'

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
)

PaginationLink.displayName = 'PaginationLink'

export { PaginationLink }
