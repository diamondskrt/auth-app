import { tagsMap } from '../config'
import { TypographyVariant } from '../model'

const getTag = (variant: TypographyVariant) => {
  if (!variant) {
    throw new Error('Variant should be provided!')
  }

  return tagsMap[variant]
}

export { getTag }
