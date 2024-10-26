import { zodResolver } from '@hookform/resolvers/zod'

import { AuthCredentials } from '~/shared/api/auth'

const formConfig = {
  resolver: zodResolver(AuthCredentials),
  defaultValues: {
    username: '',
    password: '',
  },
}

export { formConfig }
