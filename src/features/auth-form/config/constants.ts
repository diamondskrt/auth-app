import { zodResolver } from '@hookform/resolvers/zod'

import { AuthCredentialsSchema } from '~/shared/api/auth'

const formConfig = {
  resolver: zodResolver(AuthCredentialsSchema),
  defaultValues: {
    username: '',
    password: '',
  },
}

export { formConfig }
