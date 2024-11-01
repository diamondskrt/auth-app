import { ChevronRightIcon } from '@radix-ui/react-icons'

import { cn } from '~/shared/lib/utils'

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('mt-1 [&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export { BreadcrumbSeparator }
