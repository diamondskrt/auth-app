import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import { Label } from '~/shared/ui/label'

import { useFormField } from '../lib'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})

FormLabel.displayName = 'FormLabel'

export { FormLabel }
