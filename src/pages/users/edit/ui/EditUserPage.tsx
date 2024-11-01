import { UserForm } from '~/features/user-form'
import { AppBar } from '~/widgets/app-bar'

import { breadcrumbs } from '../config'

export function EditUserPage() {
  return (
    <>
      <AppBar title="Edit User" breadcrumbs={breadcrumbs} />
      <div className="page">
        <UserForm />
      </div>
    </>
  )
}
