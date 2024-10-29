import { zodResolver as coreZodResolver } from '@hookform/resolvers/zod'
import { ZodObject, z } from 'zod'

import { toApiDate, toBoolean } from './transform'

const DateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/

const zStrBoolean = z
  .string()
  .transform(toBoolean)
  .refine((val) => typeof val === 'boolean', {
    message: 'error.validation.invalid_type_boolean',
  })

const zDateTime = z
  .string()
  .datetime()
  .refine(toApiDate, { message: 'Invalid Date' })

const zodResolver = (
  ...[schema, ...rest]: Parameters<typeof coreZodResolver>
) => {
  const omitSchema =
    schema instanceof ZodObject
      ? schema.partial({
          id: true,
          createdAt: true,
        })
      : schema
  return coreZodResolver(...[omitSchema, ...rest])
}

export { DateTimePattern, zDateTime, zStrBoolean, zodResolver }
