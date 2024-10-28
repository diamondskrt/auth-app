import { useQuery } from '@tanstack/react-query'

import { getProfile } from './profile'

const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}

export { useGetProfile }
