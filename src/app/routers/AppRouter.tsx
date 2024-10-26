import Cookies from 'js-cookie'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthPage } from '~/pages/auth'
import { ErrorPage } from '~/pages/error'
import { HomePage } from '~/pages/home'

import { ProtectedRoute } from './ProtectedRoute'

const isAuthenticated = Cookies.get('accessToken')

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute isAuthenticated={Boolean(isAuthenticated)}>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export { AppRouter }
