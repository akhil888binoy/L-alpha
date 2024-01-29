import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , Typography, Button, } from '@mui/material'
import MainCircle from "../../images/circle.jpg";

const LandingPage = () => {
  return (
    <Box>
        <Box bgcolor={"#18001A"} height={"5rem"} width={"100%"}>
        <Navbar></Navbar>
        </Box>
        <Box height={"50rem"} width={"100%"} bgcolor={"#18001A"} display={"flex"} >
        <Box flex={1}   width={"20%"} >
            <Box mt={"10rem"} ml={"5rem"}>
            <Typography sx={{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
    mb:"1rem"
  }}>Welcome</Typography>
            <Typography  sx={{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 64,
    fontStyle: 'normal',
    fontWeight: 800,
    lineHeight: 'normal',
    mb:"1rem"
  }}>L-Alpha </Typography>
            <Typography sx={{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
    mb:"1rem"
  }}> Testing version of loot</Typography>
  <Button  sx={{
    width: "118px",
    height: "30px",
    flexShrink: 0,
    borderRadius: 57,
    background: 'linear-gradient(90deg, #7E489D 32.14%, #5194C3 50%)',
    color: '#FFF', // Set text color to white
    textTransform: 'none', // Set text to normal case
  }}> Learn More </Button>
        
            </Box>
           
        </Box>

      {/* Right Box */}
      <Box flex={1} >
       <Box >
        <Box sx={{
    width: "517px", // Half of 1034px
    height: "543px", // Half of 1086px
    flexShrink: 0,
    borderRadius: "543px", // Half of 1086px
    border: "5px solid #FFF",
    background: `url(${MainCircle}), lightgray 50% / cover no-repeat`,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  }} />
       </Box>
      </Box>
        </Box>
        <Box>
            About Us
        </Box>
    </Box>
  )
}

export default LandingPage