import { useMutation } from '@tanstack/react-query'

import { login } from './auth'
import { AuthCredentialsSchema } from './model'

const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: AuthCredentialsSchema) => login(credentials),
  })
}

export { useLogin }
