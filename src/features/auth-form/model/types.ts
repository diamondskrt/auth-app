import { z } from 'zod'

import { AuthCredentials } from '~/shared/api/auth'

type formSchema = z.infer<typeof AuthCredentials>

export type { formSchema }
