import { z, ZodObject } from 'zod'

import { zDateTime } from '~/shared/lib/zod'

enum Resource {
  Users = 'users',
  AbilityGroups = 'abilityGroups',
}

const UUIDSchema = z.string().uuid().optional()

const BaseEntity = z.object({
  id: UUIDSchema,
})

const WithTimestamps = <T extends z.ZodRawShape>(zodObject: ZodObject<T>) =>
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

export { Resource, UUIDSchema, BaseEntity, WithTimestamps, WithAdditionalData }
