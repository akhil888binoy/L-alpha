import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyEventWidget from "scenes/widgets/MyEventWidget";
import EventsWidget from "scenes/widgets/EventsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";
import {Typography} from "@mui/material";
import SponsorsWidget from "scenes/widgets/SponsorsWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const Role = useSelector((state)=>state.user.role);
  const firstName = useSelector((state)=> state.user.firstName);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId}  />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {Role === "eventcoordinator" &&(
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
    <Box m="2rem 0" />
          <Box display={"flex"} gap={1.5}>
          <Typography fontSize={"3rem"} >{firstName}'s</Typography> 
          <Typography fontSize={"3rem"} color={"#834bff"} >  events</Typography>
          </Box>
          <EventsWidget userId={userId} isProfile />
            </>
          )}
         

         {Role === "sponsor" &&(
            <>
              <Link to="/form" >
      <Button 
        variant="outlined"
        color="primary"
        size="large"
        sx={{ fontSize: '1.25rem', padding: '12px 24px' }} // Adjust size here
      >
        Add your Sponsor
      </Button>
    </Link>
    <Box m="2rem 0" />
          <Box display={"flex"} gap={1.5}>
          <Typography fontSize={"3rem"} >{firstName}'s</Typography> 
          <Typography fontSize={"3rem"} color={"primary"} >  sponsors</Typography>
          </Box>
          <SponsorsWidget userId={userId} isProfile />
            </>
          )}
         
         
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;