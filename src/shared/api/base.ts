import { z, ZodObject } from 'zod'

import { zDateTime } from '~/shared/lib/zod'

const BaseEntity = z.object({
  id: z.string().uuid().min(1),
})

const WithCreation = <T extends z.ZodRawShape>(zodObject: ZodObject<T>) =>
  zodObject.merge(
    z.object({
      createdAt: zDateTime,
      updatedAt: zDateTime.optional(),
    })
  )

const WithAdditionalData = <T extends z.ZodRawShape>(zodObject: ZodObject<T>) =>
  zodObject.merge(
    z.object({
      additionalData: z.unknown(),
    })
  )

export { BaseEntity, WithCreation, WithAdditionalData }
