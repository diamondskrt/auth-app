import { useId } from 'react'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'

import { FormItemContext } from '../config'

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = 'FormItem'

export { FormItem }
