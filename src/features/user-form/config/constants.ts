import { zodResolver } from '@hookform/resolvers/zod'

import { UserUpsertSchema } from '~/shared/api/user'

import { FormConfig } from '../model'

const formConfig: FormConfig = {
  resolver: zodResolver(UserUpsertSchema),
  defaultValues: {
    fullName: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    abilityGroups: [],
    merchantCode: undefined,
  },
}

export { formConfig }
