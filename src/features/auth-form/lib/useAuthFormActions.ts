import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useLogin } from '~/shared/api/auth'
import { useAuth } from '~/shared/lib/auth'
import { dayjs } from '~/shared/lib/date'

import { formConfig } from '../config'
import { formSchema } from '../model'

export function useAuthFormActions() {
  const { setAccessToken, setRefreshToken } = useAuth()
  const navigate = useNavigate()
  const form = useForm<formSchema>(formConfig)

  const { mutateAsync: login, isPending, isError, error } = useLogin()

  const onSubmit = async (values: formSchema) => {
    const data = await login(values)

    setAccessToken({
      accessToken: data.accessToken,
      expires: dayjs(data.accessTokenExpiresAt).toDate(),
    })
    setRefreshToken({
      refreshToken: data.refreshToken,
      expires: dayjs(data.refreshTokenExpiresAt).toDate(),
    })

    navigate('/')
  }

  useEffect(() => {
    if (!isError) return
    toast.error(error.message)
  }, [isError, error])

  return {
    form,
    isPending,
    onSubmit,
  }
}
