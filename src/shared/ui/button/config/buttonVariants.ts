import { cva } from 'class-variance-authority'

import { tmc } from '~/shared/lib/transform-multiple-classes'

const buttonVariants = cva(
  tmc(
    'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none,ring-1,ring-ring disabled:pointer-events-none,opacity-50'
  ),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: tmc(
          'border border-input bg-background shadow-sm hover:bg-accent,text-accent-foreground'
        ),
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: tmc('hover:bg-accent,text-accent-foreground'),
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: tmc('h-9 px-4 py-2 [&>.button-icon]:h-4,w-4'),
        sm: tmc('h-8 rounded-md px-3 text-xs [&>.button-icon]:h-4,w-4'),
        lg: tmc('h-10 rounded-md px-8 [&>.button-icon]:h-5,w-5'),
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export { buttonVariants }
