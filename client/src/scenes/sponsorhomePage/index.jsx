import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import SponsorUserWidget from 'scenes/widgets/SponsorUserWidget'
import SponsorsWidget from 'scenes/widgets/SponsorsWidget'
import { Link } from 'react-router-dom'
import {Button} from '@mui/material'

const SponsorHomePage = () => {
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
    bgcolor={"#080808"}
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <SponsorUserWidget userId={_id} picturePath={picturePath}>
          </SponsorUserWidget>
      </Box>
        <Box 
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        
        >
         <Link to="/sponsorForm">
      <Button 
        variant="outlined"
        size="large"
        sx={{ 
          fontSize: '1.25rem', // Change font size here
          padding: '12px 24px',
          color:"#834bff",
          borderColor:"#834bff"  ,
          '&:hover': {
            color: '#fff', // Change text color on hover
            backgroundColor: '#834bff', // Change background color on hover
            borderColor: '#834bff', // Change border color on hover
          },       
        }}
      >
        Add your Sponsor
      </Button>
    </Link>
          <SponsorsWidget userId={_id} ></SponsorsWidget>
        </Box>
        {isNonMobileScreens &&(
          <Box flexBasis={"26%"}>


          </Box>
        )}
    </Box>
  </Box>
  )
}

export default SponsorHomePage;