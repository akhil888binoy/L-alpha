import React from 'react'
import { useMediaQuery } from '@mui/material'
import LandingPage from 'scenes/landingPage'
import LandingPageM from 'scenes/landingPageM'
const MainLandingPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  return (
    <div>{isNonMobileScreens ? <LandingPage /> : <LandingPageM />}</div>
  )
}

export default MainLandingPage