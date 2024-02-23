import React from 'react'
import { Box } from '@mui/material'
import {Typography} from '@mui/material'
const FooterM = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#080808',
        color: '#FFFFFF',
        padding: '2rem',
        display:"flex",
        marginLeft:"1rem",
        
       
      }}
    >
        <Box>
            <Typography color={"primary"} fontSize={"2rem"}  fontWeight={"bold"}>Loot</Typography>
        </Box>
        <Box ml={3}>
            <Box><Typography color={"white"}> Home</Typography></Box>
            <Box><Typography color={"white"}> Events</Typography></Box>
            <Box><Typography color={"white"}> FAQ</Typography></Box>
        </Box>
        <Box ml={3}>
            <Box><Typography color={"white"}> About Us</Typography></Box>
            <Box><Typography color={"white"}> Careers</Typography></Box>
            <Box><Typography color={"white"}> Contact Us</Typography></Box>
        </Box>

    </Box>
  )
}

export default FooterM