import { useMutation } from '@tanstack/react-query'

import { login } from './auth'

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

export { useLogin }
