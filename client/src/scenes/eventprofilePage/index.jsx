import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";
import {Typography} from "@mui/material";
import EventsWidget from "scenes/widgets/EventsWidget";
import UserWidget from "scenes/widgets/UserWidget";
const EventProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) return null;
    
      const { firstName} = user;
     
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
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
              <Link to="/form">
      <Button 
        variant="outlined"
        size="large"
       color="primary"
       sx={{ fontSize: '1.25rem', padding: '12px 24px' }}
      > Add your Sponsor
      </Button>
    </Link>
            <Box m="2rem 0" />
            <Box display={"flex"} gap={1.5}>
            <Typography fontSize={"3rem"} >{firstName}'s</Typography> 
            <Typography fontSize={"3rem"} color={"primary"}>  Events</Typography>
            </Box>
            <EventsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
  )
}

export default EventProfilePage