import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { inputClassName } from '../config'
import { InputProps } from '../model'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, defaultValue, type, ...props }, ref) => {
    return (
      <input
        value={value ?? defaultValue ?? ''}
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
