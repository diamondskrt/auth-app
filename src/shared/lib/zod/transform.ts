import { DateTimePattern } from './constants'
import { ApiDateTime } from './model'

const toBoolean = (val: string) =>
  val === 'true' ? true : val === 'false' ? false : val

const toApiDate = (val: string): val is ApiDateTime => DateTimePattern.test(val)

export { toApiDate, toBoolean }
