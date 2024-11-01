import { Button } from '~/shared/ui/button'
import { Form, FormFieldItem } from '~/shared/ui/form'
import { Input, InputProps } from '~/shared/ui/input'

import { useAuthFormActions } from '../lib'
import { formSchema } from '../model'

export function AuthForm() {
  const { form, onSubmit, isPending } = useAuthFormActions()

  return (
    <Form<formSchema>
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="form"
    >
      <FormFieldItem<InputProps, formSchema>
        control={form.control}
        name="username"
        Component={Input}
        componentProps={{ placeholder: 'username', disabled: isPending }}
      />
      <FormFieldItem<InputProps, formSchema>
        control={form.control}
        name="password"
        Component={Input}
        componentProps={{
          placeholder: 'password',
          type: 'password',
          disabled: isPending,
        }}
      />
      <Button type="submit" loading={isPending}>
        Submit
      </Button>
    </Form>
  )
}
