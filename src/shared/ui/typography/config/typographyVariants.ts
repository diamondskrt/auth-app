import { cva } from 'class-variance-authority'

const typographyVariants = cva(undefined, {
  variants: {
    variant: {
      h1: 'heading-1',
      h2: 'heading-2',
      subtitle1: 'subtitle-1',
      subtitle2: 'subtitle-2',
      body1: 'body-1',
      body2: 'body-2',
      caption1: 'caption-1',
      caption2: 'caption-2',
    },
  },
  defaultVariants: {
    variant: 'body1',
  },
})

export { typographyVariants }
