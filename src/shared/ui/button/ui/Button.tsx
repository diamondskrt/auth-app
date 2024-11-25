import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { buttonVariants } from '../config'
import { ButtonProps } from '../model'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      disabled,
      children,
      AppendIcon,
      PrependIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        {...props}
      >
        {PrependIcon && <PrependIcon className="button-icon prepend-icon" />}
        {loading && (
          <Loader2 className="button-icon loading-icon animate-spin" />
        )}
        {children}
        {AppendIcon && <AppendIcon className="button-icon append-icon" />}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button }
