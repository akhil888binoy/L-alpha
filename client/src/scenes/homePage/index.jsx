import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import MyEventWidget from "scenes/widgets/MyEventWidget";
import EventsWidget from 'scenes/widgets/EventsWidget'
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const {_id, picturePath} = useSelector((state)=> state.user);

  return (
    <Box>
      <Navbar></Navbar>
      <Box
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="0.5rem"
      justifyContent={"space-between"}
      bgcolor={"#18001A"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath}>
            </UserWidget>
        </Box>
          <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
          >
            <MyEventWidget picturePath={picturePath}></MyEventWidget>
            <EventsWidget userId={_id} ></EventsWidget>
          </Box>
          {isNonMobileScreens &&(
            <Box flexBasis={"26%"}>


            </Box>
          )}
      </Box>
    </Box>
  )
}

export default HomePage