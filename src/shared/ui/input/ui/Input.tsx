import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { inputClassName } from '../config'
import { InputProps } from '../model'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, type, ...props }, ref) => {
    return (
      <input
        value={value ?? ''}
        type={type}
        className={cn(inputClassName, className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
