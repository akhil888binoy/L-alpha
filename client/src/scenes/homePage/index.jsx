import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import MyEventWidget from "scenes/widgets/MyEventWidget";
import EventsWidget from 'scenes/widgets/EventsWidget'
import { Link } from 'react-router-dom'
import {Button} from '@mui/material'
import EventForm from 'scenes/registerForm';
import SponsorsWidget from 'scenes/widgets/SponsorsWidget'
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const {_id,  role} = useSelector((state)=> state.user);
  
  return (
    <Box>
      <Navbar></Navbar>
      <Box
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="5rem"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} >
            </UserWidget>
        </Box>
          <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
          >
            {role ==="eventcoordinator" &&(
              <>
              <Link to="/form" >
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
   }} // Adjust size here
 >
   Add your Event
 </Button>
</Link>
            <SponsorsWidget userId={_id} ></SponsorsWidget>
              </>
            )}

{role ==="sponsor" &&(
              <>
              <Link to="/form" >
 <Button 
  variant="outlined"
  color="primary"
  size="large"
  sx={{ fontSize: '1.25rem', padding: '12px 24px' }}

    
 >
   Add your Sponsor
 </Button>
</Link>
            <EventsWidget userId={_id} ></EventsWidget>
              </>
            )}
            
          </Box>
        
      </Box>
    </Box>
  )
}

export default HomePage