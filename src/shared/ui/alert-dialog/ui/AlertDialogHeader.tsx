import { cn } from '~/shared/lib/utils'

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)

AlertDialogHeader.displayName = 'AlertDialogHeader'

export { AlertDialogHeader }
