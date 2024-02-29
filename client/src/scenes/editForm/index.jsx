import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, useTheme } from '@mui/material';
import { Link } from "@mui/material";
import { InputBase } from "@mui/material";
import Event from "@mui/icons-material/Event";
import UserImage from "components/UserImage";
import { useMediaQuery } from "@mui/material";
import YouTube from "react-youtube";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Grid} from "@mui/material";
import { UseMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { Category, Celebration, Language, LocalActivity, LocationOn, Star } from "@mui/icons-material";

const EditForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getEvent = async () => {
        const response = await fetch(`http://localhost:3001/events/${eventId}/event`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setEvent(data);
    };

    useEffect(() => {
        getEvent();
    }, []);

    if (!event) {
        return null;
    }

    const handleEdit = () => {
        setEditMode(true); // Enable edit mode
    };

    const handleSave = async () => {
        // Send updated event details to backend for saving
        try {
            await fetch(`http://localhost:3001/events/${eventId}/update`, {
                method: "PATCH", // Use PATCH method for partial updates
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(event), // Send updated event object
            });
            setEditMode(false); // Disable edit mode after saving
        } catch (error) {
            console.error("Error updating event details:", error);
        }
    };

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value, // Update event state as user types
        });
    };

    const handleHighlightChange = (index, newValue) => {
        const updatedHighlights = [...event.highlights];
        updatedHighlights[index] = { highlight: newValue };
        setEvent({ ...event, highlights: updatedHighlights });
    };

    const handleAddHighlight = () => {
        setEvent({
            ...event,
            highlights: [...event.highlights, { highlight: '' }]
        });
    };

    const handleMarketingPlanChange = (index, newValue, field) => {
        const updatedMarketingPlans = [...event.marketingPlans];
        updatedMarketingPlans[index][field] = newValue;
        setEvent({ ...event, marketingPlans: updatedMarketingPlans });
    };

    const handleAddMarketingPlan = () => {
        setEvent({
            ...event,
            marketingPlans: [...event.marketingPlans, { budget: '', heading: '', description: '' }]
        });
    };

    const {
        firstName,
        lastName,
        eventName,
        eventCoordinator,
        userId,
        date,
        youtubeLink,
        websiteLink,
        eventLocation,
        email,
        highlights,
        eventPhoneNumber,
        theme,
        userPicturePath,
        description,
        ticketSold,
        marketingPlans
    } = event;

    return (
        <Box>
            <Navbar></Navbar>
        <Box  
      width={"100%"}
      padding={"2rem 6%"}
      display={ "block"}
      gap="1rem"
      justifyContent={"space-between"}
      bgcolor={"#080808"}
      >
 <WidgetWrapper width={"40%"}>
            <Box gap="1rem">
                <Box>
                <Typography  fontSize={"3rem"}>Edit Event</Typography>
                    {!editMode ? (
                        <>
                            {/* Display editable fields only if not in edit mode */}
                             {/* Display editable fields only if not in edit mode */}
                             <Box className="main" sx={{display: "flex",
                             flexDirection: "column",
                             gap: "1rem" }}>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2} >
                             <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">  Event Name : </Typography>
                             <Typography variant="h4"  fontWeight="500">  {eventName}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500"> Event Coordinator: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {eventCoordinator}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Date: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {date}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Youtube Link: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {youtubeLink}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Website Link: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {websiteLink}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Event Location: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {eventLocation}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Phone Number: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {eventPhoneNumber}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Description: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {description}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                      
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Ticket Sold </Typography>
                             <Typography variant="h4"  fontWeight="500"> {ticketSold}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Theme: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {theme}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Celebration color="primary"  />
                             <Typography variant="h5" color="grey" fontWeight="500">Email: </Typography>
                             <Typography variant="h4"  fontWeight="500"> {email}</Typography>
                             </Box>
                             
                            <Typography variant="h4" color={dark} fontWeight="500">Highlights:</Typography>
                            {highlights.map((highlight, index) => (
                                   <Box sx={{
                                    borderRadius: "2rem",
                                    bgcolor: "#080808",
                                    padding: "0.5rem 1rem",
                                    display: "inline-flex",
                                   
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    border:"0.1rem solid  #1E1E1E",
                                    textOverflow: "ellipsis",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                }} gap={2}>
                                        <Celebration color="primary"  />
                                         <Typography variant="h4"  fontWeight="500"> {highlight.highlight}</Typography>
                                         </Box>
                
                            ))}
                            <Typography variant="h4" color={dark} fontWeight="500">Marketing Plans:</Typography>
                            {marketingPlans.map((plan, index) => (

<Box sx={{
    borderRadius: "2rem",
    bgcolor: "#080808",
    padding: "0.5rem 1rem",
   
    overflow: "hidden",
    whiteSpace: "nowrap",
    border:"0.1rem solid  #1E1E1E",
    textOverflow: "ellipsis",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}} gap={2} >
        <Celebration color="primary"  />
        <Typography key={index} variant="h4" color={dark} fontWeight="500">
            Budget: {plan.budget}
        </Typography>
        <Typography key={index} variant="h4" color={dark} fontWeight="500">
            Heading: {plan.heading}
        </Typography>
        <Typography key={index} variant="h4" color={dark} fontWeight="500">
            Description: {plan.description}
        </Typography>

         </Box>
         
                               
                            ))}
                             </Box>
                             
                        </>
                    ) : (
                        <>
                            <Box>
                                {/* Input fields for editing */}
                                <TextField name="eventName" label="First Name" value={eventName} onChange={handleChange} />
                                <TextField name="eventCoordinator" label="Event Coordinator" value={eventCoordinator} onChange={handleChange} />
                                <TextField name="date" label="Date" value={date} onChange={handleChange} />
                                <TextField name="yotubeLink" label="Yotube Link" value={youtubeLink} onChange={handleChange} />
                                <TextField name="websiteLink" label="Website Link" value={websiteLink} onChange={handleChange} />
                                <TextField name="eventLocation" label=" Event Location" value={eventLocation} onChange={handleChange} />
                                <TextField name="eventPhoneNumber" label=" Event Contact Number" value={eventPhoneNumber} onChange={handleChange} />
                                <TextField name="description" label=" Event Description" value={description} onChange={handleChange} />
                                <TextField name="ticketSold" label="Ticket Sold" value={ticketSold} onChange={handleChange} />
                                <TextField name="theme" label="Theme of the Event" value={theme} onChange={handleChange} />
                                <TextField name="email" label="Email" value={email} onChange={handleChange} />

                                <Typography variant="h4" color={dark} fontWeight="500">Highlights:</Typography>
                                {highlights.map((highlight, index) => (
                                    <TextField
                                        key={index}
                                        value={highlight.highlight}
                                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    />
                                ))}
                                <Button onClick={handleAddHighlight}>Add Highlight</Button>

                                <Typography variant="h4" color={dark} fontWeight="500">Marketing Plans:</Typography>
                                {marketingPlans.map((plan, index) => (
                                    <div key={index}>
                                        <TextField
                                            value={plan.budget}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'budget')}
                                        />
                                        <TextField
                                            value={plan.heading}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'heading')}
                                        />
                                        <TextField
                                            value={plan.description}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'description')}
                                        />
                                    </div>
                                ))}
                                <Button onClick={handleAddMarketingPlan}>Add Marketing Plan</Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>

            {!editMode && <Button onClick={handleEdit}>Edit</Button>}
            {editMode && <Button onClick={handleSave}>Save</Button>}
        </WidgetWrapper>
      </Box>
        </Box>
        
       
    );
};

export default EditForm;
