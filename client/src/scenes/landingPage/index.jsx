import React, { useState } from 'react'
import Navbar from 'scenes/navbar'
import { Box , Typography, Button, } from '@mui/material'
import MainCircle from "../../images/circle.jpg";
import {useTheme} from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import {Grid }from '@mui/material';
import {CardMedia} from '@mui/material';
import EventsWidget from 'scenes/widgets/EventsWidget';
import myImage from "../../images/circle.jpg"
import NavbarA from 'scenes/navbarA';
import PaidIcon from '@mui/icons-material/Paid';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useMediaQuery } from '@mui/material';
import Typewriter from 'typewriter-effect';
import Image from "../../images/circle.jpg"


const LandingPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const borderColor = '#1E1E1E';
  const greyColor = '#111111'; // Adjust the hex code as per your preference
  const[showFullText, setShowFullText]= useState("false")
  const theme = useTheme();
  
  return (
    <Box bgcolor={"#080808"} >
        <NavbarA></NavbarA>
        <Box height={"30rem"} width={"100%"} bgcolor={""} position="relative">
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <img src={Image} alt="Your Alt Text" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <Typography
        fontSize={100}
        sx={{
          color: "white",
          fontStyle: "medium",
          fontWeight: 800,
          lineHeight: "normal",
          mb: "1rem",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%"
        }}
      >
        <Typewriter
          options={{
            strings: ["Sponsor an Event", "Get your jackpot Sponsor"],
            autoStart: true,
            loop: true,
            cursor: ""
          }}
        />
      </Typography>
    </Box>



    
    <Box width={"100%"} height={"20rem"} mt={10}  bgcolor={"#080808"}>
  <Box display={isNonMobileScreens? "flex" : "block"}   alignItems={"center"} justifyContent={"center"} gap={6} >
    <Box
      width={isNonMobileScreens? 400 : 200}
      height={isNonMobileScreens? 212 : 105}
      bgcolor="#111111"
      borderRadius={6}
      border="0.1rem solid #1E1E1E"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mr={2}
    >
      <PaidIcon color="primary"  sx={{ fontSize: "3rem" }}></PaidIcon> 
      <Typography ml={"0.5rem"} fontSize={isNonMobileScreens? "2rem" : "1rem"}>Find a Sponsor</Typography>
    </Box>
    <Box
      width={isNonMobileScreens? 400 : 200}
      height={isNonMobileScreens? 212 : 105}
      
      bgcolor="#111111"
      borderRadius={6}
      border="0.1rem solid #1E1E1E"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mr={2}
    >
      <LocalActivityIcon color="primary"  sx={{ fontSize: "3rem" }}></LocalActivityIcon> 
      <Typography ml={"0.5rem"} fontSize={isNonMobileScreens? "2rem" : "1rem"}>Sponsor an Event</Typography>
    </Box>
  </Box>
  

</Box>
{/* Featured Events*/ }
<Box width={"100%"} height={"10rem"} bgcolor={"#080808"} display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center">
        <Typography fontSize={"3rem"} sx={{ marginRight: '45rem', color: '#ffffff' }}>Featured Events</Typography>
        <Button variant="contained">
          <Typography color={"white"} fontFamily={"sans-serif"} >View all Events</Typography>
        </Button>
      </Box>
    </Box>
      {/* events */}    
      <Box width={"100%"} height={"45rem"} bgcolor={"#080808"} >
        <Box height={"42rem"} width={ 413} ml={"1rem"} bgcolor={greyColor} borderRadius={3} >
        <Box sx={{ position: 'relative' }} >
  <CardMedia
    component="img"
    image={myImage}
    alt="Descriptive image alt text"
    sx={{ height: 200 }} // Adjust the height as needed
  />
  <Box
  sx={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(8, 8, 8, 0.7)',
    padding: '0.5rem',
    display: 'flex', // Enable flexbox
    justifyContent: 'space-between', // Place items at the ends
    alignItems: 'center',
    borderRadius: '0 0 10px 10px', // Rounded bottom corners
  }}
>
  <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>Location</Typography>
  <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>Theme</Typography>
</Box>

</Box>

<Box ml={"1rem"}>
<Box sx={{ display: 'flex', alignItems: 'center' ,  marginBottom: '1rem', marginTop:'1rem' }} >
  <Typography fontSize={"2rem"}>Event Name</Typography>
  <Box sx={{
    height: 43,
    width: 106,
    borderRadius: 10,
    backgroundColor: '#080808',
    border: "0.1rem solid #1E1E1E",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1rem', // Add margin between Event Name and TicketSold
  }}>
    <Typography>TicketSold</Typography>
  </Box>
</Box>

        <Box><Typography color={"#CCCCCD"} >"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum libero id ex vehicula, ut fermentum arcu placerat. Integer eu odio nec lorem finibus faucibus. Nulla facilisi. Aliquam erat volutpat. Sed vestibulum sapien nec dolor ultrices, at hendrerit magna volutpat. Duis vestibulum, nisl ac euismod dignissim, turpis risus imperdiet lacus </Typography></Box>
        <Box mt={"1rem"} >
          <Typography fontSize={"1.5rem"}  >Marketing Plans</Typography>
          <Box sx={{
            marginTop:"1rem",
            marginRight:"1rem",
  backgroundColor: '#080808',
  borderRadius: 5,
  border: "0.1rem solid #1E1E1E",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Ensure the main box fills its parent's height
}}>
  <Box display="flex" flexDirection="column" alignItems="center" mt={"1rem"} mb={"1rem"}> {/* Make the inner boxes flex containers */}
    <Box display="flex" alignItems="center" mb={1} gap={"3rem"}>
      <Typography fontSize="1rem">Heading</Typography>
      <Typography ml={1} fontSize="1rem">Budget</Typography>
      <Typography ml={1} fontSize="1rem">Conversion rate</Typography>
    </Box>
    <Box display="flex" alignItems="center" mb={1} gap={"3rem"}>
      <Typography fontSize="1rem">Heading</Typography>
      <Typography ml={1} fontSize="1rem">Budget</Typography>
      <Typography ml={1} fontSize="1rem">Conversion rate</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={"3rem"}>
      <Typography fontSize="1rem">Heading</Typography>
      <Typography ml={1} fontSize="1rem">Budget</Typography>
      <Typography ml={1} fontSize="1rem">Conversion rate</Typography>
    </Box>
  </Box>
</Box>
<Box mt={"1.5rem"} >
<Button variant="contained"   >
          <Typography color={"white"}  width={"22rem"} fontFamily={"sans-serif"} >Event Details</Typography>
        </Button>
</Box>
</Box>
</Box>
</Box>
        
      </Box>
      <Box width={"100%"} height={"10rem"} bgcolor={"#080808"} display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center">
        <Typography fontSize={"3rem"} sx={{ marginRight: '40rem', color: '#ffffff' }}> What Our Client Says </Typography>
        <Button variant="contained">
          <Typography color={"white"} fontFamily={"sans-serif"} >View all clients</Typography>
        </Button>
      </Box>    
    </Box>
     {/* Reviews */}
     <Box width={"100%"} height={"30rem"}  bgcolor={"#080808"}>
  <Box display="flex"  ml={"3rem"} gap={"2rem"} >
  <Box
      width={400}
      height={312}
      bgcolor="#111111"
      borderRadius={6}
      border="0.1rem solid #1E1E1E"
      justifyContent="center"
      alignItems="center"
     
    >
      <Box ml={"1rem"} mt={"1rem"}>
      <StarsIcon color="primary"    sx={{ fontSize: "2rem" }}></StarsIcon> 
      <Typography  mt={"1rem"}  fontSize={"1rem"} color={"#CCCCCD"}>The platform offers a visually stunning and user-friendly experience for event organizers and attendees alike. With a few enhancements in customization options and performance optimization, it has the potential to become a top choice for event planning and attendance.       
</Typography>
<Typography mt={"2rem"} fontSize={"1.5rem"} color={"white"}> -Mood Indigo </Typography>
      </Box>
      
    </Box>
    <Box
      width={400}
      height={312}
      bgcolor="#111111"
      borderRadius={6}
      border="0.1rem solid #1E1E1E"
      justifyContent="center"
      alignItems="center"
     
    >
      <Box ml={"1rem"} mt={"1rem"}>
      <StarsIcon color="primary"    sx={{ fontSize: "2rem" }}></StarsIcon> 
      <Typography  mt={"1rem"}  fontSize={"1rem"} color={"#CCCCCD"}>The platform offers a visually stunning and user-friendly experience for event organizers and attendees alike. With a few enhancements in customization options and performance optimization, it has the potential to become a top choice for event planning and attendance.       
</Typography>
<Typography mt={"2rem"} fontSize={"1.5rem"} color={"white"}> -Mood Indigo </Typography>
      </Box>
      
    </Box>
    <Box
      width={400}
      height={312}
      bgcolor="#111111"
      borderRadius={6}
      border="0.1rem solid #1E1E1E"
      justifyContent="center"
      alignItems="center"
     
    >
      <Box ml={"1rem"} mt={"1rem"}>
      <StarsIcon color="primary"    sx={{ fontSize: "2rem" }}></StarsIcon> 
      <Typography  mt={"1rem"}  fontSize={"1rem"} color={"#CCCCCD"}>The platform offers a visually stunning and user-friendly experience for event organizers and attendees alike. With a few enhancements in customization options and performance optimization, it has the potential to become a top choice for event planning and attendance.       
</Typography>
<Typography mt={"2rem"} fontSize={"1.5rem"} color={"white"}> -Mood Indigo </Typography>
      </Box>
      
    </Box>
  </Box>
</Box>
    </Box>
  )
}

export default LandingPage