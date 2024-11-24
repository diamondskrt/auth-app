import { useGetProfile } from '~/shared/api/profile'
import { useAuth } from '~/shared/lib/auth'

export function useProfileActions() {
  const { clearTokens } = useAuth()

  const { data } = useGetProfile()

  return { user: data?.data, clearTokens }
}
