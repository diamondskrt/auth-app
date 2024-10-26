import { z } from 'zod'

import { AbilityGroup } from './config'

type AbilityGroupSchema = z.infer<typeof AbilityGroup>

export type { AbilityGroupSchema }
