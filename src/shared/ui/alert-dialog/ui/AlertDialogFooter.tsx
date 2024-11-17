import { cn } from '~/shared/lib/utils'

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)

AlertDialogFooter.displayName = 'AlertDialogFooter'

export { AlertDialogFooter }
