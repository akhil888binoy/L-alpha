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
import { AccountCircle, BorderColor, Category, Celebration, Description, Email, InsertInvitation, Language, LocalActivity, LocalPhone, LocationOn, MonetizationOn, Star, Storefront } from "@mui/icons-material";

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

    const handleDeleteMarketingPlan = (index) => {
        const updatedMarketingPlans = [...event.marketingPlans];
        updatedMarketingPlans.splice(index, 1);
        setEvent({ ...event, marketingPlans: updatedMarketingPlans });
    };

    const handleDeleteHighlight = (index) => {
        const updatedHighlights = [...event.highlights];
        updatedHighlights.splice(index, 1);
        setEvent({ ...event, highlights: updatedHighlights });
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
 <WidgetWrapper width={isNonMobile? "50%" : "100%"}>
            <Box gap="1rem">
                <Box>
                <Typography  fontSize={"3rem"}>Edit Event</Typography>
                    {!editMode ? (
                        <>
                            {/* Display editable fields only if not in edit mode */}
                             {/* Display editable fields only if not in edit mode */}
                             <Box mt={3} className="main" sx={{display: "flex",
                             flexDirection: "column",
                             gap: "1rem" }}>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2} >
                             <Celebration color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">  Event Name : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500">  {eventName}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <AccountCircle color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500"> Event Coordinator : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {eventCoordinator}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <InsertInvitation color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Date : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {date}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <YouTubeIcon color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Youtube Link : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {youtubeLink}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                        
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Language color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Website Link : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {websiteLink}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <LocationOn color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Event Location : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {eventLocation}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <LocalPhone color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Phone Number : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {eventPhoneNumber}</Typography>
                             </Box>

                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <BorderColor color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Description : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {description}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                      
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <LocalActivity color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Ticket Sold : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {ticketSold}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Category color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Theme : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {theme}</Typography>
                             </Box>
                             <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#080808",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                       
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        border:"0.1rem solid  #1E1E1E",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }} gap={2}>
                            <Email color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Email : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {email}</Typography>
                             </Box>
                             
                            <Typography variant={isNonMobile? "h4": "h5"} color={dark} fontWeight="500">Highlights :</Typography>
                            {highlights.map((highlight, index) => (
                                   <Box sx={{
                                    borderRadius: "2rem",
                                    bgcolor: "#080808",
                                    padding: "1rem 2rem",
                                    display: "inline-flex",
                                   
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    border:"0.1rem solid  #1E1E1E",
                                    textOverflow: "ellipsis",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                }} gap={2}>
                                        <Star color="primary"  />
                                         <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {highlight.highlight}</Typography>
                                         </Box>
                
                            ))}
                            <Typography variant={isNonMobile? "h4": "h5"} color={dark} fontWeight="500">Marketing Plans :</Typography>
                            {marketingPlans.map((plan, index) => (

<Box sx={{
    borderRadius: "1rem",
    bgcolor: "#080808",
    padding: "1rem 2rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    border:"0.1rem solid  #1E1E1E",
    textOverflow: "ellipsis",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
}} >
    <Box display={"flex"} gap={1}  alignItems="center">
    <MonetizationOn color="primary"  />
    <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500"> Budget : </Typography>
        <Typography key={index} variant={isNonMobile? "h4": ""} color={dark} fontWeight="500">
            {plan.budget}
        </Typography>
    </Box>
        <Box display={"flex"} gap={1} mt={1}  alignItems="center">
            <Storefront color="primary"></Storefront>
            <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Heading :  </Typography>
        <Typography key={index} variant={isNonMobile? "h5": ""} color={dark} fontWeight="500"> {plan.heading}</Typography>
        </Box>

        <Box display={"flex"} gap={1} mt={1}  alignItems="center">
            <Description color="primary"></Description>
            <Typography variant="h5" color="grey" fontWeight="500">Description : </Typography>
        <Typography key={index}  color={dark} fontWeight="500">
            {plan.description}
        </Typography>
        </Box>
        
      

         </Box>
         
                               
                            ))}
                             </Box>
                             
                        </>
                    ) : (
                        <>
                            <Box>
                                {/* Input fields for editing */}

                                <Box mt={3} className="main" sx={{display: "flex",
                             flexDirection: "column",
                             gap: "1rem" }}> 
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Celebration color="primary"  />
                             <TextField  name="eventName" fullWidth label="Event Name" value={eventName} onChange={handleChange} />
                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <AccountCircle color="primary"></AccountCircle>
                             <TextField name="eventCoordinator" fullWidth label="Event Coordinator" value={eventCoordinator} onChange={handleChange} />
                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <InsertInvitation color="primary"></InsertInvitation>
                             <TextField name="date" fullWidth label="Date" value={date} onChange={handleChange} />
                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <YouTubeIcon color="primary"></YouTubeIcon>
                             <TextField name="yotubeLink" fullWidth label="Youtube Link" value={youtubeLink} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <Language color="primary"></Language>
                             <TextField name="websiteLink" fullWidth label="Website Link" value={websiteLink} onChange={handleChange} />

                             </Box>

                             <Box  alignItems={"center"} display={"flex"} gap={1}>
                                <LocationOn color="primary"></LocationOn>
                             <TextField name="eventLocation" fullWidth label=" Event Location" value={eventLocation} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                            <LocalPhone color="primary"></LocalPhone>
                             <TextField  fullWidth name="eventPhoneNumber" label=" Event Contact Number" value={eventPhoneNumber} onChange={handleChange} />

                             </Box>

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <BorderColor color="primary"  />

                             <TextField fullWidth name="description" label=" Event Description" value={description} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <LocalActivity color="primary" />

                             <TextField fullWidth name="ticketSold" label="Ticket Sold" value={ticketSold} onChange={handleChange} />

                             </Box>

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Category color="primary" />

                             <TextField fullWidth name="theme" label="Theme of the Event" value={theme} onChange={handleChange} />

                             </Box>

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Email color="primary"  />   
                             <TextField  fullWidth name="email" label="Email" value={email} onChange={handleChange} />

                             </Box>

                                <Typography variant="h4" color={dark} fontWeight="500">Highlights:</Typography>
                                {highlights.map((highlight, index) => (
                                    <Box alignItems={"center"} display={"flex"} gap={1}>
                                    <Star color="primary"></Star>
                                    <TextField fullWidth
                                    label={`Event Highlight ${index + 1}`}
                                        key={index}
                                        value={highlight.highlight}
                                        onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    />
                                    <Button onClick={() => handleDeleteHighlight(index)}>Delete</Button>

                                    </Box>
                                   
                                ))}
                                <Button  onClick={handleAddHighlight}> + Add Highlight</Button>

                                <Typography variant="h4" color={dark} fontWeight="500">Marketing Plans:</Typography>
                                {marketingPlans.map((plan, index) => (
                                    <div key={index}>
                                        <Box sx={{display: "flex",
                             flexDirection: "column",
                             gap: "1rem" }} mt={2}>
                                <Typography variant="h5"  fontWeight="500">Marketing Plan {index+1}</Typography>
                                <Box alignItems={"center"} display={"flex"} gap={1} mt={1}>
                                    <MonetizationOn color="primary"></MonetizationOn>
                                <TextField fullWidth
                                 label={`Budget of Marketing Plan ${index + 1}`}
                                            value={plan.budget}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'budget')}
                                        />
                                </Box>
                                       <Box alignItems={"center"} display={"flex"} gap={1}>
                                        <Storefront color="primary"></Storefront>
                                       <TextField
                                       fullWidth
                                       label={`Heading of Marketing Plan ${index + 1}`}
                                            value={plan.heading}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'heading')}
                                        />
                                       </Box>
                                        <Box alignItems={"center"} display={"flex"} gap={1}>
                                        <Description color="primary"></Description>
                                        <TextField
                                            fullWidth
                                            label={`Description of Marketing Plan ${index + 1}`}
                                            value={plan.description}
                                            onChange={(e) => handleMarketingPlanChange(index, e.target.value, 'description')}
                                        />
                                        </Box>
                                       
                                        </Box>
                                        <Box mt={2} ml={4}>
                                        <Button onClick={() => handleDeleteMarketingPlan(index)}  variant="outlined">Delete</Button>
                                        </Box>

                                    </div>
                                ))}
                                <Button  onClick={handleAddMarketingPlan}>+ Add Marketing Plan</Button>
                             </Box>
                               
                            </Box>
                        </>
                    )}
                </Box>
            </Box>

            {!editMode && <Box mt={3}>
                <Button onClick={handleEdit} variant="contained" >Edit</Button>
            </Box> }
            {editMode && <Button onClick={handleSave} variant="contained">Save</Button>}
        </WidgetWrapper>
      </Box>
        </Box>
        
       
    );
};

export default EditForm;
