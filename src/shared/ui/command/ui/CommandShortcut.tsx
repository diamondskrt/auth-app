import { cn } from '~/shared/lib/utils'

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

CommandShortcut.displayName = 'CommandShortcut'

export { CommandShortcut }
