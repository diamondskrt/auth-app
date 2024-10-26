import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useLogin } from '~/shared/api/auth'
import { Button } from '~/shared/ui/button'
import { Form, FormFieldItem } from '~/shared/ui/form'
import { Input, InputProps } from '~/shared/ui/input'

import { formConfig } from '../config'
import { setTokens } from '../lib'
import { formSchema } from '../model'

export function AuthForm() {
  const navigate = useNavigate()
  const form = useForm<formSchema>(formConfig)

  const {
    mutateAsync: login,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useLogin()

  const onSubmit = async (values: formSchema) => {
    login(values)
  }

  useEffect(() => {
    if (isSuccess) {
      setTokens(data)
      navigate('/')
    }

    if (isError) {
      toast.error(error.message)
    }
  }, [isSuccess, isError, navigate, error, data])

  return (
    <Form<formSchema>
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-4 md:w-1/2 lg:w-1/3 2xl:w-1/5"
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
      <Button type="submit" disabled={isPending}>
        Submit
      </Button>
    </Form>
  )
}
