import React from 'react'
import MyEventWidget from 'scenes/widgets/MyEventWidget'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import {Typography} from '@mui/material'
import MySponsorWidget from 'scenes/widgets/MySponsorWidget'

const SponsorForm = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const {_id, picturePath} = useSelector((state)=> state.user);

  return (
    <Box>
        <Navbar></Navbar>
        <Box  
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="1rem"
      justifyContent={"space-between"}
      bgcolor={"#080808"}
      >
        <MySponsorWidget picturePath={picturePath}></MySponsorWidget>
      </Box>
    </Box>
  )
}

export default SponsorForm