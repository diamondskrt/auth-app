import { type VariantProps } from 'class-variance-authority'

import { buttonVariants } from '../config'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export type { ButtonProps }
