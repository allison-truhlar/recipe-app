import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// pages and components
import Home from "./routes/Home"
import Signup from "./routes/Signup"
import Login from "./routes/Login"
import LandingPageLayout from "./layouts/LandingPageLayout"

const router = createBrowserRouter([
    {
      path:"/",
      element: <LandingPageLayout />,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/login",
          element:<Login/>
        }
      ]
    }
  ])

export default function App(){
    return(
        <RouterProvider router={router}/>
    )
}