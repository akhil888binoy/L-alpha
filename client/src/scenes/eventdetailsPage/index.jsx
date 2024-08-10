import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector , useDispatch} from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setEvent } from 'state'
import EventdetailWidget from 'scenes/widgets/EventdetailWidget'
const EventDetailsPage = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { eventId } = useParams();
  const token = useSelector((state) => state.token);
  const events = useSelector((state)=>state.events.events);

  const currentEvent = events.find((event) => event._id === eventId);


  const getEvent = async()=>{
    const response = await fetch (`http://localhost:3001/events/${eventId}/event`, {
      method: "GET",
      headers:{Authorization :  `Bearer ${token}`},
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(setEvent({event : data}));
  };
  useEffect(() => {
    getEvent();
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
        <Navbar></Navbar>
        <Box>    
          {
            currentEvent &&(
              <EventdetailWidget 
                eventId={currentEvent._id}
               bannerpicturePath={currentEvent.bannerpicturePath} 
               logopicturePath={currentEvent.logopicturePath} 
               eventName={currentEvent.eventName}
    eventCoordinator={currentEvent.eventCoordinator}
    userId={currentEvent.userId}
    date={currentEvent.date}
    youtubeLink={currentEvent.youtubeLink}
    websiteLink={currentEvent.websiteLink}
    eventLocation={currentEvent.eventLocation}
    email ={currentEvent.email}
    highlights ={currentEvent.highlights}
    eventPhoneNumber ={currentEvent.eventPhoneNumber}
    theme ={currentEvent.theme}
    userPicturePath ={currentEvent.userPicturePath}
    description ={currentEvent.description}
    ticketSold ={currentEvent.ticketSold}
    marketingPlans = {currentEvent.marketingPlans}
               ></EventdetailWidget>
            )} 
          
        </Box>

    </Box>
  )
}

export default EventDetailsPage