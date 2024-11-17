import { UseFormProps } from 'react-hook-form'

import { UserUpsert, UserUpsertSchema } from '~/shared/api/user'

type FormConfig = UseFormProps<(typeof UserUpsertSchema)['_type']>

type formSchema = UserUpsert

export type { formSchema, FormConfig }
