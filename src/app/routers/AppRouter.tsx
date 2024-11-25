import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { AbilityGroupsListPage } from '~/pages/ability-groups'
import { AuthPage } from '~/pages/auth'
import { ErrorPage } from '~/pages/error'
import {
  UsersListPage,
  ShowUserPage,
  CreateUserPage,
  EditUserPage,
} from '~/pages/users'

import { MainLayout } from '../layouts'

import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/users" />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <UsersListPage />,
          },
          {
            path: 'create',
            element: <CreateUserPage />,
          },
          {
            path: ':id',
            element: <ShowUserPage />,
          },
          {
            path: ':id/edit',
            element: <EditUserPage />,
          },
        ],
      },
      {
        path: 'ability-groups',
        children: [
          {
            index: true,
            element: <AbilityGroupsListPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
])

const AppRouter = () => <RouterProvider router={router} />

export { AppRouter }
