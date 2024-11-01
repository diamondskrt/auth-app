import { type VariantProps } from 'class-variance-authority'

import { buttonVariants } from '../config'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  AppendIcon?: React.ElementType<React.RefAttributes<SVGSVGElement>>
  PrependIcon?: React.ElementType<React.RefAttributes<SVGSVGElement>>
}

export type { ButtonProps }
