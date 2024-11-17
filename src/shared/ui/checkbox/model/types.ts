import { CheckboxProps as CheckboxRadixProps } from '@radix-ui/react-checkbox'

interface CheckboxProps
  extends Omit<
    CheckboxRadixProps,
    'value' | 'onChange' | 'checked' | 'onCheckedChange' | 'defaultChecked'
  > {
  label: string
  checkBoxId?: string
  description?: string
  indeterminate?: boolean
  value?: boolean
  onChange?(checked: boolean): void
}

type CheckboxForwardRef = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLButtonElement>
>

export type { CheckboxProps, CheckboxForwardRef }
