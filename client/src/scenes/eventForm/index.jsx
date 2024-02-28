import React from 'react'
import MyEventWidget from 'scenes/widgets/MyEventWidget'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import {Typography} from '@mui/material'

const EventForm = () => {
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
        <MyEventWidget picturePath={picturePath}></MyEventWidget>
        <Box mt={isNonMobileScreens? "": "1rem"}>
          <Box textAlign={"center"}>
          <Typography variant={"h1"} color={"primary"} >Disclaimer</Typography>
          </Box>
          <Box mt={2} textAlign={"center"}>
            <Box>
            <Typography tesxtAlign={"center"} fontSize={"1.2rem"}>The registered event cannot be edited/updated due to fraud concerns</Typography>
            </Box>
            <Box>
            <Typography tesxtAlign={"center"} fontSize={"1.2rem"}>So please cross check the details before registering</Typography>
            </Box>
          </Box>
          <Box textAlign={"right"} mt={1}>
            <Typography tesxtAlign={"center"} fontSize={"1.1rem"} color={"primary"}>- Akhil Binoy</Typography>
            <Typography tesxtAlign={"center"} fontSize={"1rem"} color={"primary"}>Founder  </Typography>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default EventForm