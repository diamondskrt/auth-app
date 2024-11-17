import { Role } from '../ability-group'
import { User } from '../user'

interface Profile extends Omit<User, 'abilityGroups'> {
  abilityGroups: Role[]
}

export type { Profile }
