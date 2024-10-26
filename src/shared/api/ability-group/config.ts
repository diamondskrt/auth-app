import { z } from 'zod'

const AbilityGroup = z.object({
  name: z.string(),
  description: z.string(),
})

export { AbilityGroup }
