import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorPage } from '~/pages/error'
import { HomePage } from '~/pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export { AppRouter }
