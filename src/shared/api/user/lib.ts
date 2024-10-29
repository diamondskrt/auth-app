import { Role } from './config'
import { UserSchema } from './model'

const getUserRole = (user?: UserSchema): Role | undefined => {
  const abilityGroups = user?.abilityGroups

  if (!abilityGroups?.length) return

  return [Role.Admin, Role.Operator, Role.Merchant, Role.Worker].find(
    (roleToCheck) => abilityGroups.some((role) => role === roleToCheck)
  )
}

export { getUserRole }
