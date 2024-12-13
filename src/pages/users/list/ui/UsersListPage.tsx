import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '~/shared/ui/button'
import { Loader } from '~/shared/ui/loader'
import { Pagination } from '~/shared/ui/pagination'
import { Typography } from '~/shared/ui/typography'
import { AppBar } from '~/widgets/app-bar'

import { useUsersListActions } from '../lib'

import { User } from './User'
import { UserFilters } from './UserFilters'

export function UsersListPage() {
  const { users, isPending, onBlockUserToggle, onDeleteUser, total } =
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
      <UserFilters className="mb-6" />
      {isPending ? (
        <Loader />
      ) : (
        <div className="user-list">
          {users?.length ? (
            <>
              <div className="grid divide-y">
                {users.map((user) => (
                  <User
                    key={user.id}
                    data={user}
                    deleteUser={onDeleteUser}
                    onBlockUserToggle={onBlockUserToggle}
                  />
                ))}
              </div>
              <Pagination total={total} />
            </>
          ) : (
            <Typography tag="p">No data</Typography>
          )}
        </div>
      )}
    </>
  )
}
