import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EventdetailWidget from 'scenes/widgets/EventdetailWidget'
const EventDetailsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const token = useSelector((state) => state.token);


  const getEvent = async()=>{
    const response = await fetch (`http://localhost:3001/events/${eventId}/event`, {
      method: "GET",
      headers:{Authorization :  `Bearer ${token}`},
    });
    const data = await response.json();
    setEvent(data);
  }
  useEffect(() => {
    getEvent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!event) return null;
  return (
    <Box>
        <Navbar></Navbar>
        <Box>     
          <EventdetailWidget eventId={eventId} bannerpicturePath={event.bannerpicturePath} logopicturePath={event.logopicturePath} ></EventdetailWidget>
        </Box>

    </Box>
  )
}

export default EventDetailsPage