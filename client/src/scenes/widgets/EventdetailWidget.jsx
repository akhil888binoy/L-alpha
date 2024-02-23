import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material';

import UserWidget from "./UserWidget";
import {InputBase} from "@mui/material";
import Event from "@mui/icons-material/Event";
import UserImage from "components/UserImage";
import {useMediaQuery} from "@mui/material";
import { Category, LocalActivity, LocationOn, Star } from "@mui/icons-material";

const EventdetailWidget = ({eventId, bannerpicturePath }) => {
   const isNonMobile = useMediaQuery("(min-width:600px)");
 const [event, setEvent] = useState(null);
 const navigate = useNavigate();
 const token = useSelector((state)=> state.token);
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   message: ''
 });
 const handleChange = (event) => {
   const { name, value } = event.target;
   setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (event) => {
   event.preventDefault();
 
   // Extract coordinator's email from the event object
   const coordinatorEmail = email; // Replace this with the actual location of the coordinator's email in your event data
 
   // Add your logic to send the form data to the backend
   try {
     const response = await fetch(`http://localhost:3001/events/${eventId}/event/email`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         to: coordinatorEmail,
         from: formData.email,
         subject: `Message from ${formData.name}`,
         text: formData.message
       })
     });
     if (response.ok) {
       console.log('Email sent successfully');
     } else {
       console.error('Failed to send email');
     }
   } catch (error) {
     console.error('Error sending email:', error);
   }
 };
 
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
    highlights,
    eventPhoneNumber,
    theme,
    userPicturePath,
    description,
    ticketSold,
    marketingPlans
 }=event;
 
    return (
    <Box bgcolor={"#080808"}>
        <Box>
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <img
    width={isNonMobile ? "70%":"100%"}
    height="70%"
    alt="event"
    style={{ borderRadius: "0.75rem" }}
    src={`http://localhost:3001/assets/${bannerpicturePath}`}
  />
</Box>
      {/* Heading Event Name */}
        <Box textAlign={"center"} mt={"1rem"}>
        <Typography color={"white"} variant={ isNonMobile? "h1" : "h2"}>{eventName}</Typography>
        </Box>

        {/* Description , ticketsold , date , theme, location and ticketsold  */}
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <WidgetWrapper mt={"1rem"}  width={"80%"}>
         <Box >
         <Typography fontSize={"1.2rem"}>{description}</Typography>
         </Box>
         <Box mt={5} display={isNonMobile? "flex" : "block"} style={{  justifyContent: "center", alignItems: "center" }} gap={10}>
         <Box  gap={isNonMobile? "": 2} sx={{
  bgcolor: "#080808",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: "0.1rem solid #1E1E1E",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
   <Box display={"flex"} gap={0.5}>
   <Event color="primary" sx={{ fontSize: 32 }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Date</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{date}</Typography> {/* Increase text size */}
</Box>

<Box  gap={isNonMobile? "": 2} sx={{
  bgcolor: "#080808",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: "0.1rem solid #1E1E1E",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
   <Box display={"flex"} gap={0.5}>
   <Category color="primary" sx={{ fontSize: 32 }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Theme</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{theme}</Typography> {/* Increase text size */}
</Box>
<Box  gap={isNonMobile? "": 2} sx={{
  bgcolor: "#080808",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: "0.1rem solid #1E1E1E",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
   <Box display={"flex"} gap={0.5}>
   <LocationOn color="primary" sx={{ fontSize: 32 }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Location</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{eventLocation}</Typography> {/* Increase text size */}
</Box>
<Box  gap={isNonMobile? "": 2} sx={{
  bgcolor: "#080808",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: "0.1rem solid #1E1E1E",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}}>
   <Box display={"flex"} gap={0.5}>
   <LocalActivity color="primary" sx={{ fontSize: 32 }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Tickets Sold</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{ticketSold}</Typography> {/* Increase text size */}
</Box>
         </Box>
        </WidgetWrapper>
        </Box>
        
        <Box display={isNonMobile? "flex" : "block"} gap={2} style={{  justifyContent: "center", alignItems: "center" }} ml={isNonMobile? "": "3.7rem"}>
         <WidgetWrapper mt={"1rem"}  width={ isNonMobile?  "40%" : "80%"}>
         <Typography textAlign={"center"} variant="h3">Contact Form</Typography>
         <Box>
         <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Message"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          
        />
        <Button variant="contained" color="primary" type="submit" >Send</Button>
      </form>
         </Box>
         </WidgetWrapper>
        <WidgetWrapper mt={"1rem"}  width={ isNonMobile?  "40%" : "80%"}>      
         <Typography textAlign={"center"} variant="h3">Contact Info</Typography>
        <Box mt={2}>
        <UserImage  image={userPicturePath}></UserImage>

        </Box>
         <Box mt={2} gap={2}>

         <Typography fontSize={ isNonMobile? "1rem" : ""}>Event Coordinator : {firstName} {lastName}</Typography>       
        <Typography color={"white"} fontSize={ isNonMobile? "1rem" : ""}> Email Id : {email} </Typography>
           <Typography color={"white" } fontSize={ isNonMobile? "1rem" : ""}> Phone Number : {eventPhoneNumber}</Typography>
            </Box>
        </WidgetWrapper>
</Box>

{/* Highlights */}
<Box  ml={isNonMobile? "" : "3.5rem"} display={isNonMobile? "flex" : "block"} gap={2} style={{  justifyContent: "center", alignItems: "center" }} >
         <WidgetWrapper mt={"1rem"}  width={ isNonMobile?  "80%" : "80%"}> 
         <Typography textAlign={"center"} variant="h3">Highlights of the Event</Typography>

         <Box display={ isNonMobile? "flex":"block"} gap={5} mt={"1rem"} >
         {highlights.map((highlight, index) => (
        <Box key={index} sx={{
         bgcolor: "#080808",
         padding: "0.5rem 1rem",
         borderRadius: "1rem",
         alignItems: "center",
         justifyContent: "center",
         overflow: "hidden",
         border: "0.1rem solid #1E1E1E",
         whiteSpace: "nowrap",
         textOverflow: "ellipsis",
         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
       }}  mt={isNonMobile? "": 1}  >
         <Box  display={"flex"} gap={1} alignItems={"center"}>
            <Star color={"primary"}>Budget: </Star>
         <Typography fontSize={ isNonMobile? "1.2rem": "1rem"}>  {highlight.highlight}</Typography>
         </Box>
        </Box>
      ))}
         </Box>
         
         </WidgetWrapper>
         </Box>
{/* Marketing Plans */}

<Box  ml={isNonMobile? "" : "3.5rem"} display={isNonMobile? "flex" : "block"} gap={2} style={{  justifyContent: "center", alignItems: "center" }} >
         <WidgetWrapper mt={"1rem"}  width={ isNonMobile?  "80%" : "80%"}> 
         <Typography textAlign={"center"} variant="h3">Marketing Plans</Typography>

         <Box display={ isNonMobile? "flex":"block"} gap={5} mt={"1rem"} >
         {marketingPlans.map((plan, index) => (
        <Box key={index} sx={{
         bgcolor: "#080808",
         padding: "0.5rem 1rem",
         borderRadius: "1rem",
         alignItems: "center",
         justifyContent: "center",
         overflow: "hidden",
         border: "0.1rem solid #1E1E1E",
         whiteSpace: "nowrap",
         textOverflow: "ellipsis",
         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
       }}  mt={isNonMobile? "": 1}  >
         <Box  display={"flex"} gap={1} alignItems={"center"}>
            <Typography color={"grey"}>Budget: </Typography>
         <Typography fontSize={ isNonMobile? "1.5rem": "1rem"}> $ {plan.budget}</Typography>
         </Box>
         <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography color={"grey"}>Title: </Typography>
         <Typography fontSize={ isNonMobile? "1.2rem" :"0.7rem"}>  {plan.heading}</Typography>
         </Box>
         <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography color={"grey"}>Description: </Typography>
            <Typography fontSize={isNonMobile? "1rem" : "0.5rem"} >  {plan.description}</Typography>
         </Box>
        </Box>
      ))}
         </Box>
         
         </WidgetWrapper>
         </Box>
        </Box>
       
        
        
    </Box>
  )
}

export default EventdetailWidget