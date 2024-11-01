import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { UserInfo, useUsersListActions } from '~/entities/user'
import { Resource } from '~/shared/api/config'
import { useGetUserById } from '~/shared/api/user'
import { Button } from '~/shared/ui/button'
import { Confirm } from '~/shared/ui/confirm'
import { Loader } from '~/shared/ui/loader'
import { Typography } from '~/shared/ui/typography'
import { AppBar } from '~/widgets/app-bar'

import { getBreadcrumbs } from '../lib'

export function ShowUserPage() {
  const { id } = useParams<{ id: string }>()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const {
    isPending: isUserActionPending,
    onBlockUserToggle,
    onDeleteUser,
  } = useUsersListActions()

  const {
    data: user,
    isPending: isGetUserByIdPending,
    isError,
    error,
  } = useGetUserById({
    userId: id,
    queryParams: {
      include: `${Resource.AbilityGroups}`,
    },
  })

  const isPending = isUserActionPending || isGetUserByIdPending

  useEffect(() => {
    if (!isError) return
    toast.error(error.message)
  }, [isError, error])

  return (
    <>
      <AppBar title="User Info" breadcrumbs={getBreadcrumbs(user)} />
      {isPending ? (
        <Loader />
      ) : (
        <div className="page">
          {user ? (
            <div className="user">
              <UserInfo user={user} />
              <div className="mt-6 flex gap-3">
                <Link to={`/users/${user.id}/edit`}>
                  <Button size="sm">Edit</Button>
                </Link>
                {user.blockedAt ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onBlockUserToggle({ userId: user.id, block: false })
                    }
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onBlockUserToggle({ userId: user.id, block: true })
                    }
                  >
                    Block
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Delete
                </Button>
              </div>
              <Confirm
                open={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                onOk={() => onDeleteUser(user.id)}
                onCancel={() => setIsConfirmOpen(false)}
              />
            </div>
          ) : (
            <Typography>No data</Typography>
          )}
        </div>
      )}
    </>
  )
}
