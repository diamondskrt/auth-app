import { SelectProps as RadixSelectProps } from '@radix-ui/react-select'

interface SelectProps extends Omit<RadixSelectProps, 'onValueChange'> {
  placeholder?: string
  choices: Record<string, string>[]
  choiceValue?: string
  choiceLabel?: string
  allowClear?: boolean
  onChange?: (value: string) => void
}

type SelectForwardRef = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLDivElement>
>

export type { SelectProps, SelectForwardRef }
