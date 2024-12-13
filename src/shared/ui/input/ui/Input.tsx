import { Cross2Icon } from '@radix-ui/react-icons'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { inputClassName } from '../config'
import { InputProps } from '../model'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, value, defaultValue, type, allowClear, onChange, ...props },
    ref
  ) => {
    const onClear = () => {
      onChange?.({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <div className={cn(inputClassName, className)}>
        <input
          ref={ref}
          value={(value || defaultValue) ?? ''}
          type={type}
          className="h-full flex-1 focus-visible:outline-none"
          onChange={onChange}
          {...props}
        />
        {allowClear && value && (
          <Cross2Icon className="h-4 w-4" onPointerDown={onClear} />
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
