import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useUsersListActions } from '~/entities/user'
import { Button } from '~/shared/ui/button'
import { Loader } from '~/shared/ui/loader'
import { Typography } from '~/shared/ui/typography'
import { AppBar } from '~/widgets/app-bar'

import { User } from './User'

export function UsersListPage() {
  const { users, isPending, onBlockUserToggle, onDeleteUser } =
    useUsersListActions()

  return (
    <>
      <AppBar
        title="Users"
        Actions={
          <Link to="/users/create">
            <Button PrependIcon={Plus}>Create user</Button>
          </Link>
        }
      />
      {isPending ? (
        <Loader />
      ) : (
        <div className="user-list">
          {users ? (
            <div className="grid divide-y">
              {users.map((user) => (
                <User
                  data={user}
                  key={user.id}
                  onBlockUserToggle={onBlockUserToggle}
                  deleteUser={onDeleteUser}
                />
              ))}
            </div>
          ) : (
            <Typography tag="p">No data</Typography>
          )}
        </div>
      )}
    </>
  )
}
