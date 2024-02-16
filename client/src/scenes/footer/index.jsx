import { Box } from '@mui/material'
import React from 'react'
import {Typography} from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#080808',
        color: '#FFFFFF',
        padding: '2rem',
        display:"flex",
        marginLeft:"2rem",
        
       
      }}
    >
        <Box>
            <Typography color={"primary"} fontSize={"3rem"}  fontWeight={"bold"}>Loot</Typography>
        </Box>
        <Box ml={"15rem"} display={"flex"} gap={"10rem"} >
        <Box >
      <Typography fontSize={"2rem"}> Home </Typography>
      <Typography fontSize={"2rem"}>Events</Typography>
      <Typography fontSize={"2rem"}>FAQs</Typography>
      <Typography fontSize={"2rem"}></Typography>
      </Box>
      <Box>
        <Typography fontSize={"2rem"}>Events</Typography>
        <Typography fontSize={"2rem"}>Categories</Typography>
      </Box>
      <Box>
        <Typography fontSize={"2rem"}>Contact Us</Typography>
        <Typography fontSize={"2rem"}>Email</Typography>
      </Box>
        </Box>
      
    </Box>
  )
}

export default Footer