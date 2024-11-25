import { useLocationPath } from '~/shared/lib/location'
import { Button } from '~/shared/ui/button'
import { Form, FormFieldItem } from '~/shared/ui/form'
import { Input, InputProps } from '~/shared/ui/input'
import {
  SelectMultiple,
  SelectMultipleProps,
} from '~/shared/ui/select-multiple'

import { useUserFormActions } from '../lib'
import { formSchema } from '../model'

export function UserForm() {
  const { abilityGroupList, form, onSubmit, isPending } = useUserFormActions()
  const { isCreateRoute } = useLocationPath()

  return (
    <Form<formSchema>
      form={form}
      className="form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormFieldItem<InputProps, formSchema>
        required
        control={form.control}
        name="fullName"
        label="fullName"
        Component={Input}
        componentProps={{
          placeholder: 'fullName',
          disabled: isPending,
        }}
      />
      <FormFieldItem<InputProps, formSchema>
        required
        control={form.control}
        name="username"
        label="Username"
        Component={Input}
        componentProps={{
          placeholder: 'username',
          disabled: isPending,
        }}
      />
      <FormFieldItem<InputProps, formSchema>
        control={form.control}
        name="email"
        label="Email"
        Component={Input}
        componentProps={{
          placeholder: 'email',
          disabled: isPending,
        }}
      />
      <FormFieldItem<InputProps, formSchema>
        control={form.control}
        name="phone"
        label="Phone"
        Component={Input}
        componentProps={{
          placeholder: 'phone',
          disabled: isPending,
        }}
      />
      <FormFieldItem<InputProps, formSchema>
        required
        control={form.control}
        label="Merchant code"
        name="merchantCode"
        Component={Input}
        componentProps={{
          placeholder: 'merchantCode',
          disabled: isPending,
        }}
      />
      {isCreateRoute && (
        <FormFieldItem<InputProps, formSchema>
          required
          control={form.control}
          name="password"
          label="Password"
          Component={Input}
          componentProps={{
            placeholder: 'password',
            disabled: isPending,
            type: 'password',
          }}
        />
      )}
      <FormFieldItem<SelectMultipleProps, formSchema>
        control={form.control}
        name="abilityGroups"
        label="Ability groups"
        Component={SelectMultiple}
        componentProps={{
          placeholder: 'abilityGroups',
          loading: isPending,
          choices: abilityGroupList ?? [],
          choiceLabel: 'name',
          choiceValue: 'id',
          maxCount: 1,
          allowClear: true,
          returnObject: true,
        }}
      />
      <Button type="submit" disabled={isPending} className="!mt-6">
        Submit
      </Button>
    </Form>
  )
}
