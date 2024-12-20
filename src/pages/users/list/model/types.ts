import { UUID } from '~/shared/api/model'
import { User } from '~/shared/api/user'

type UserFiltersProps = React.HTMLAttributes<HTMLDivElement> & {}

type OnBlockUserToggleParams = {
  userId?: UUID
  block: boolean
}

type UserProps = {
  data: User
  onBlockUserToggle: ({ userId, block }: OnBlockUserToggleParams) => void
  deleteUser: (userId?: UUID) => void
}

export type { UserProps, OnBlockUserToggleParams, UserFiltersProps }
