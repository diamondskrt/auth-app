import { FieldValues } from 'react-hook-form'

import { FormFieldItemProps } from '../model'

import { FormControl } from './FormControl'
import { FormField } from './FormField'
import { FormItem } from './FormItem'
import { FormLabel } from './FormLabel'
import { FormMessage } from './FormMessage'

export function FormFieldItem<P, TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  Component,
  componentProps,
}: FormFieldItemProps<P, TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-400">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Component {...field} {...componentProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
