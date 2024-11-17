import { getUserRole } from '~/shared/api/ability-group'
import { Typography } from '~/shared/ui/typography'

import { UserInfoProps } from '../model'

export function UserInfo({ user }: UserInfoProps) {
  if (!user) return <Typography>No data</Typography>

  return (
    <div className="flex flex-col gap-1">
      <Typography>
        Username: <span className="text-primary">{user.username}</span>
      </Typography>
      <Typography>
        Merchant code: <span className="text-primary">{user.merchantCode}</span>
      </Typography>
      {user.email && (
        <Typography>
          Email: <span className="text-primary">{user.email}</span>
        </Typography>
      )}
      {Boolean(user.abilityGroups.length) && (
        <Typography>
          Role:{' '}
          <span className="text-primary">
            {getUserRole(user.abilityGroups.map(({ name }) => name))}
          </span>
        </Typography>
      )}
    </div>
  )
}
