import React from 'react'
import Footer from 'scenes/footer'
import FooterM from 'scenes/FooterM'
import { useMediaQuery } from '@mui/material'


const MainFooter = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  return (
    <div>{isNonMobileScreens ? <Footer /> : <FooterM />}</div>

  )
}

export default MainFooter