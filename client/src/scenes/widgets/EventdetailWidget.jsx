import { Box, Typography, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserWidget from "./UserWidget";
import UserImage from "components/UserImage";

const EventdetailWidget = ({eventId, bannerpicturePath, logopicturePath}) => {
 const [event, setEvent] = useState(null);
 const navigate = useNavigate();
 const token = useSelector((state)=> state.token);

 const getEvent = async()=>{
    const response = await fetch(`http://localhost:3001/events/${eventId}/event`, {
        method : "GET",
        headers: {Authorization : `Bearer ${token}`},
    });
    const data = await response.json();
    setEvent(data);

 };

 useEffect(()=>{
    getEvent();
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 if(!event){
    return null;
 }

 const {
    firstName,
    lastName,
    eventName,
    date,
    eventLocation,
    email,
    eventPhoneNumber,
    theme,
    description,
    ticketSold,
    marketingPlans
 }=event;
 
    return (
    <WidgetWrapper>
        <FlexBetween>
           <Typography color={"white"}>{eventName}</Typography>
           <Typography>{date}</Typography>
           <Typography>{description}</Typography>
           <Typography>{email}</Typography>
           <Typography>{eventLocation}</Typography>
           <Typography>{eventPhoneNumber}</Typography>
           <Typography>{theme}</Typography>
           <Typography>{ticketSold}</Typography>
          
        </FlexBetween>
        <UserImage image={bannerpicturePath} />
        <UserImage image={logopicturePath} />

        {marketingPlans.map((plan, index) => (
        <Box key={index}>
          <Typography>{plan.budget}</Typography>
          <Typography>{plan.heading}</Typography>
          <Typography>{plan.description}</Typography>
        </Box>
      ))}
        
    </WidgetWrapper>
  )
}

export default EventdetailWidget