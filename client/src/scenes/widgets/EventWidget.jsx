import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,   
  ShareOutlined,
} from "@mui/icons-material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EventIcon from '@mui/icons-material/Event';
import { NavLink } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import {CardMedia} from '@mui/material';
import {useMediaQuery} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "state";
import Button from '@mui/material/Button'; // Updated import

const EventWidget =({
  eventId,
  eventUserId,
  name,
  eventName,
  date,
  eventLocation,
  email,
  eventPhoneNumber,
  description,
  theme,
  location,
  bannerpicturePath,
  logopicturePath,
  userPicturePath,
  ticketSold,
  marketingPlans,
  likes,
})=>{
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const {_id, picturePath} = useSelector((state)=> state.user);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/events/${eventId}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedEvent = await response.json();
        dispatch(setEvent({ event: updatedEvent }));
    };

    const deleteEvent = async () => {
        const response = await fetch(`http://localhost:3001/events/${eventUserId}/${eventId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        dispatch(setEvent({ event: result }));  
    };

    const words = description.split(" ");
    // Select the first 50 words
    const truncatedDescription = words.slice(0, 50).join(" ");

    return(
        <WidgetWrapper m="2rem 0" >
            <Box display="flex" flexDirection="column" alignItems="center">
                {bannerpicturePath && (
                    <img
                        width="100%"
                        height="100%"
                        alt="event"
                        style={{ borderRadius: "0.75rem", }}
                        src={`http://localhost:3001/assets/${bannerpicturePath}`}
                    />
                )}
                <Box display={isNonMobileScreens? "flex":"block"} justifyContent="space-between" alignItems="center" width="100%" mt={"1rem"} gap={  1 }>
                    <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        border:"0.1rem solid  #1E1E1E",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}>
                        <Typography color="white" variant="subtitle1">
                            {theme}
                        </Typography>
                    </Box>
                    <Box >
                        <Typography color={"white"} variant="h6" fontSize={isNonMobileScreens? "2rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                            {eventName}
                        </Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}>
                        <PlaceIcon color="primary"></PlaceIcon>
                        <Typography color="white" variant="subtitle1" ml={"0.2rem"}>
                            {eventLocation}
                        </Typography>
                    </Box>
                </Box>
                <Typography mt={"1rem"} color={"grey"}>
                    {truncatedDescription}
                    {words.length > 50 && " ..."} {/* Display ellipsis if the description has more than 50 words */}
                    {words.length > 50 && <Button onClick={() => navigate(`/events/${eventId}/event`)}>
                        Read more
                    </Button>}
                </Typography>
                <Typography color={"white"} mt={"1rem"} fontSize={"1rem"}>
                    Marketing Plans:
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={1}>
                    <Box display="flex" flexWrap="wrap" justifyContent="flex-end" alignItems="center" gap={1}>
                        {marketingPlans.map((plan, index) => (
                            <Box key={index} style={{
                                borderRadius: "2rem",
                                padding: "0.5rem 1rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                border:"0.1rem solid  #1E1E1E",
                                textOverflow: "ellipsis",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                            }} bgcolor={"#080808"}>
                                <Typography variant="subtitle1">{plan.heading}</Typography>
                                <Typography variant="subtitle1" ml={"0.3rem"}>${plan.budget}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="1rem" gap={2}>
                <Box display="flex" alignItems="center" >
                <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
                    <Typography>{likeCount}</Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <EventIcon color={"primary"}></EventIcon>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                        {date}
                    </Typography>
                </Box>
                <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <LocalActivityIcon color={"primary"}></LocalActivityIcon>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                        {ticketSold}
                    </Typography>
                </Box>
                {eventUserId === loggedInUserId && (
                    <Button 
                    size="small"
                        variant="outlined" 
                        style={{
                            borderRadius: 6,
                            padding: "0.5rem 1rem",
                            alignItems: "center",
                            justifyContent: "center",
                        }} 
                        onClick={deleteEvent}
                    >
                        <Typography color="primary" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                           <DeleteIcon></DeleteIcon>
                        </Typography>
                    </Button>
                )}
                
            </Box>
            <Box mt={3} >
            <Button 
                    variant="contained" 
                    style={{
                        borderRadius: 6,
                        padding: "0.5rem 1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        size:"small",
                    }} 
                    onClick={() => navigate(`/events/${eventId}/event`)}
                >
                    <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                        Details
                    </Typography>
                </Button>
            
            </Box>
            
        </WidgetWrapper>  
    );
}
export default EventWidget;
