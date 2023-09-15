import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// pages and components
import Home from "./routes/Home"
import LandingPageLayout from "./layouts/LandingPageLayout"

const router = createBrowserRouter([
    {
      path:"/",
      element: <LandingPageLayout />,
      children:[
        {
            path:"/",
            element:<Home/>
        }
      ]
    }
  ])

export default function App(){
    return(
        <RouterProvider router={router}/>
    )
}