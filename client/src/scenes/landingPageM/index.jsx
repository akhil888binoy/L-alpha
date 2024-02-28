import { Box } from '@mui/material'
import React from 'react'
import NavbarA from 'scenes/navbarA'
import Image from "../../images/circle.jpg"
import {Typography} from '@mui/material'
import Typewriter from 'typewriter-effect'
import { EmojiEvents, LocalActivity, Paid } from '@mui/icons-material'
const LandingPageM = () => {
  return (
    <Box>
        <NavbarA></NavbarA>
        <Box display={"block"}>
        <Box height={"20rem"} width={"100%"} bgcolor={"indigo"} position="relative">
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <img src={Image} alt="Your Alt Text" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <Typography
        fontSize={32}
        sx={{
          color: "white",
          fontStyle: "medium",
          fontWeight: 800,
          lineHeight: "normal",
          mb: "1rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%"
        }}
      >
        <Typewriter
          options={{
            strings: ["Sponsor an Event", "Get your jackpot Sponsor", "Sponsor a Talent"],
            autoStart: true,
            loop: true,
            cursor: ""
          }}
        />
      </Typography>
    </Box>
    <Box height={"screen"} width={"100%"} bgcolor={"#080808"}  display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box display="flex" flexDirection="column">
      <Box
      height={"10rem"}
      width={"20rem"}
      
      mb={2}
      bgcolor={"#111111"}
      border="0.1rem solid #1E1E1E"
      borderRadius={6}
      mt={"1rem"}
      display="flex"
      
      justifyContent="center"
      alignItems="center"
    >
      <Paid color="primary" sx={{ fontSize: "3rem" }} />
      <Typography ml={"0.5rem"} fontSize={"2rem"}>
        Find a Sponsor
      </Typography>
    </Box>
    <Box
      height={"10rem"}
      width={"20rem"}
      bgcolor={"#111111"}
      border="0.1rem solid #1E1E1E"
      mb={2}
      borderRadius={6}
      mt={"1rem"}
      display="flex"
      
      justifyContent="center"
      alignItems="center"
    >
      <LocalActivity color="primary" sx={{ fontSize: "3rem" }} />
      <Typography ml={"0.5rem"} fontSize={"2rem"}>
       Sponsor an Event
      </Typography>
    </Box>
      </Box>
    </Box>
        </Box>
    </Box>
  )
}

export default LandingPageM