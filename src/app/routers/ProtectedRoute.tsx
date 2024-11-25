import { Navigate } from 'react-router-dom'

import { useAuth } from '~/shared/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate replace to="/auth" />
}
