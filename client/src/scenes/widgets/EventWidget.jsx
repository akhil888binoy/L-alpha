
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,   
    ShareOutlined,
  } from "@mui/icons-material";
  import { NavLink } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
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

      const words = description.split(" ");
  // Select the first 50 words
  const truncatedDescription = words.slice(0, 50).join(" ");

      return(
        <WidgetWrapper m="2rem 0">
        <Box display="flex" flexDirection="column" alignItems="center">
          {logopicturePath && (
            <img
              width="100%"
              height="auto"
              alt="event"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${logopicturePath}`}
            />
          )}
          <FlexBetween display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={"1rem"}>
          <Box sx={{
  borderRadius: "1rem",
  bgcolor: "#350439",
  padding: "0.5rem 1rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
  <Typography color="white" variant="subtitle1">
    {theme}
  </Typography>
</Box>

            <Typography color={"white"} variant="h6" fontSize={"2rem"}>
                {eventName}
              </Typography>
              <Box sx={{
  borderRadius: "1rem",
  bgcolor: "#350439",
  padding: "0.5rem 1rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
  <Typography color="white" variant="subtitle1">
    {eventLocation}
  </Typography>
</Box>

          </FlexBetween>

          <Typography mt={"1rem"}>
      {truncatedDescription}
      {words.length > 50 && " ..."} {/* Display ellipsis if the description has more than 50 words */}
    </Typography>
          <Typography color={"white"} mt={"1rem"}>
              Marketing Plans:
            </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={1}>
            
            <Box display="flex" flexWrap="wrap" justifyContent="flex-end" alignItems="center">
              {marketingPlans.map((plan, index) => (
                <div key={index} style={{ marginLeft: "1rem" }}>
                  <Typography variant="subtitle1">Heading: {plan.heading}</Typography>
                  <Typography variant="subtitle1">Budget: ${plan.budget}</Typography>
                </div>
              ))}
            </Box>
          </Box>
        </Box>
  
        <Box display="flex" justifyContent="space-between" mt="1rem">
          <Box display="flex" alignItems="center">
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Box>
          <Box sx={{
  borderRadius: "1rem",
  bgcolor: "#350439",
  padding: "0.5rem 1rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
  <Typography color="white" variant="subtitle1">
    {ticketSold}
  </Typography>
  
</Box>

      <Button 
        variant="contained" 
        style={{ backgroundColor: '#008080', color: 'white' }} // Teal color
        onClick={() => navigate(`/events/${eventId}/event`)}
     >
        Go to Event Details
      </Button>
   
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
      </WidgetWrapper>  
      );
  }
export default EventWidget;