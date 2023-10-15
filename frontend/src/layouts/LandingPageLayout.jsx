import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const LandingPageLayout = () => {
  return (
    <div>
        <Navbar />
        <div className="pages flex-col">
            <Outlet />
        </div>
    </div>
  )
}

export default LandingPageLayout