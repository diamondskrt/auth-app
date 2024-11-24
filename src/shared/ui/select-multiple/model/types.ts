interface SelectMultipleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string
  value?: string[] | Record<string, string>[]
  choices: Record<string, string>[]
  choiceValue?: string
  choiceLabel?: string
  allowClear?: boolean
  disabled?: boolean
  loading?: boolean
  returnObject?: boolean
  maxCount?: number
  onChange?: (values: string[] | Record<string, string>[]) => void
}

type SelectMultipleForwardRef = React.ForwardRefExoticComponent<
  SelectMultipleProps & React.RefAttributes<HTMLDivElement>
>

export type { SelectMultipleProps, SelectMultipleForwardRef }
