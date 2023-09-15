import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const LandingPageLayout = () => {
  return (
    <div>
        <Navbar />
        <div className="pages">
            <Outlet />
        </div>
    </div>
  )
}

export default LandingPageLayout