import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { cn } from '~/shared/lib/utils'

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

export { BreadcrumbEllipsis }
