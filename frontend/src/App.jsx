import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./routes/Home"
import Manage from "./routes/Manage"
import LandingPageLayout from "./layouts/LandingPageLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/manage", element: <Manage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
