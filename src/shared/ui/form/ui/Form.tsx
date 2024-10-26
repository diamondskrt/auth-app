import React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

import { cn } from '~/shared/lib/utils'

interface FormProps<TFieldValues extends FieldValues>
  extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  form: UseFormReturn<TFieldValues>
}

export function Form<TFieldValues extends FieldValues>({
  children,
  form,
  className,
  onSubmit,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form className={cn(className)} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}
