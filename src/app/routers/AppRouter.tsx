import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthPage } from '~/pages/auth'
import { ErrorPage } from '~/pages/error'
import { HomePage } from '~/pages/home'

import { MainLayout } from '../layouts'

import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <HomePage />
        </MainLayout>
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
