import type { VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

import { typographyVariants } from '../config'

interface TypographyProps
  extends HTMLAttributes<HTMLSpanElement>,
    TypographyVariantProps {
  tag?: keyof HTMLElementTagNameMap
}

type TypographyVariant = TypographyVariantProps['variant']

type TypographyVariantProps = VariantProps<typeof typographyVariants>

export type { TypographyProps, TypographyVariant, TypographyVariantProps }
