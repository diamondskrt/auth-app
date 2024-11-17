import React from 'react'

import { cn } from '~/shared/lib/utils'

import { typographyVariants } from '../config'
import { getTag } from '../lib'
import { TypographyProps } from '../model'

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body1', tag, ...props }, ref) => {
    const Component = tag ?? getTag(variant)

    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ className, variant }))}
        {...props}
      />
    )
  }
)

Typography.displayName = 'Typography'

export { Typography }
