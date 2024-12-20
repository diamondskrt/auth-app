import * as SelectPrimitive from '@radix-ui/react-select'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))

SelectLabel.displayName = SelectPrimitive.Label.displayName

export { SelectLabel }
