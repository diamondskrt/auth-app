import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useLogin } from '~/shared/api/auth'
import { useAuth } from '~/shared/lib/auth'
import { dayjs } from '~/shared/lib/date'
import { handleError } from '~/shared/lib/handleError'

import { formConfig } from '../config'
import { formSchema } from '../model'

export function useAuthFormActions() {
  const { setAccessToken, setRefreshToken } = useAuth()
  const navigate = useNavigate()
  const form = useForm<formSchema>(formConfig)

  const { mutateAsync: login, isPending, isError, error } = useLogin()

  const onSubmit = async (values: formSchema) => {
    try {
      const data = (await login(values))?.data

      setAccessToken({
        accessToken: data.accessToken,
        expires: dayjs(data.accessTokenExpiresAt).toDate(),
      })
      setRefreshToken({
        refreshToken: data.refreshToken,
        expires: dayjs(data.refreshTokenExpiresAt).toDate(),
      })

      navigate('/')
    } catch (error) {
      handleError(error as Error)
    }
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
