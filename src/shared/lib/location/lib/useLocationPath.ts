import { useLocation } from 'react-router-dom'

export function useLocationPath() {
  const location = useLocation()
  const isEditRoute = location.pathname.includes('edit')
  const isCreateRoute = location.pathname.includes('create')

  return {
    isEditRoute,
    isCreateRoute,
  }
}
