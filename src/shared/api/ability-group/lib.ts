import { Role } from './config'

const getUserRole = (abilityGroups?: Role[]): Role | undefined => {
  if (!abilityGroups?.length) return

  return [Role.Admin, Role.Operator, Role.Merchant, Role.Worker].find(
    (roleToCheck) => abilityGroups.some((role) => role === roleToCheck)
  )
}

export { getUserRole }
