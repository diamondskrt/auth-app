import { Control, FieldPath, FieldValues, Path } from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

type FormFieldItemProps<P, TFieldValues extends FieldValues> = {
  Component: JSX.ElementType
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  required?: boolean
  componentProps: P
}

export type { FormFieldContextValue, FormItemContextValue, FormFieldItemProps }
