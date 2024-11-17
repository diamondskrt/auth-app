import { ElementType } from 'react'

import { TypographyVariant } from '../model'

const tagsMap: Record<
  Exclude<TypographyVariant, undefined | null>,
  ElementType
> = {
  h1: 'h1',
  h2: 'h2',
  subtitle1: 'h3',
  subtitle2: 'h4',
  body1: 'span',
  body2: 'span',
  caption1: 'p',
  caption2: 'p',
}

export { tagsMap }
