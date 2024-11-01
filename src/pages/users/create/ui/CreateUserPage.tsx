import { UserForm } from '~/features/user-form'
import { AppBar } from '~/widgets/app-bar'

import { breadcrumbs } from '../config'

export function CreateUserPage() {
  return (
    <>
      <AppBar title="Create User" breadcrumbs={breadcrumbs} />
      <div className="page">
        <UserForm />
      </div>
    </>
  )
}
