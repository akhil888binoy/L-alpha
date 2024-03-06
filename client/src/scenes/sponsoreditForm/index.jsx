import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, useTheme } from '@mui/material';
import { Link } from "@mui/material";
import { InputBase } from "@mui/material";
import UserImage from "components/UserImage";
import { useMediaQuery } from "@mui/material";
import YouTube from "react-youtube";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Grid} from "@mui/material";
import { UseMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import { AccountCircle, BorderColor, CardTravel, Category, Celebration, Construction, Description, Email, InsertInvitation, Language, LinkedIn, LocalActivity, LocalPhone, LocationOn, MonetizationOn, Phone, Star, Storefront, Twitter } from "@mui/icons-material";

import React from 'react'

const SponsorEditForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [sponsor, setSponsor] = useState(null);
    const navigate = useNavigate();
    const { sponsorId } = useParams();
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getSponsor = async () => {
        const response = await fetch(`http://localhost:3001/sponsors/${sponsorId}/sponsor`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSponsor(data);
    };

    useEffect(() => {
        getSponsor();
    }, []);

    if (!sponsor) {
        return null;
    }
    const handleEdit = () => {
        setEditMode(true); // Enable edit mode
    };

    const handleSave = async () => {
        // Send updated sponsor details to backend for saving
        try {
            await fetch(`http://localhost:3001/sponsors/${sponsorId}/update`, {
                method: "PATCH", // Use PATCH method for partial updates
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(sponsor), // Send updated Sponsor object
            });
            setEditMode(false); // Disable edit mode after saving
        } catch (error) {
            console.error("Error updating sponsor details:", error);
        }
    };

    const handleChange = (e) => {
        setSponsor({
            ...sponsor,
            [e.target.name]: e.target.value, // Update sponsor state as user types
        });
    };
    const handleSponsorPhoneNumberChange = (index, newValue) => {
        const updatedSponsorPhoneNumber = [...sponsor.sponsorphoneNumber];
        updatedSponsorPhoneNumber[index] = { phoneNumber: newValue };
        setSponsor({ ...sponsor, sponsorphoneNumber: updatedSponsorPhoneNumber });
    };

    const handleAddSponsorPhoneNumber = () => {
        setSponsor({
            ...sponsor,
            sponsorphoneNumber: [...sponsor.sponsorphoneNumber, { phoneNumber: '' }]
        });
    };

    const handleDeleteSponsorPhoneNumber = (index) => {
        const updatedSponsorPhoneNumber = [...sponsor.sponsorphoneNumber];
        updatedSponsorPhoneNumber.splice(index, 1);
        setSponsor({ ...sponsor, sponsorphoneNumber: updatedSponsorPhoneNumber });
    };

    const{
        userId,
        sponsorName,
        sponsorphoneNumber,
        interestedtheme,
        sponsorInfo,
        location,
        sponsorEmail,
        budget,
        industry,
        sponsortwitterLink,
        sponsorlinkedinLink,
        sponsorCoordinator
    
     }=sponsor;
  return (
    <Box>
        <Navbar></Navbar>
        <Box width={"100%"}
      padding={"2rem 6%"}
      display={ "block"}
      gap="1rem"
      justifyContent={"space-between"}
      bgcolor={"#080808"}>
        <WidgetWrapper width={isNonMobile? "50%" : "100%"}>
            <Box  gap="1rem">
                <Box>
                <Typography  fontSize={"3rem"}>Edit Sponsor</Typography>
                
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
                             <CardTravel color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">  Sponsor Name : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500">  {sponsorName}</Typography>
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
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500"> Sponsor Coordinator : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {sponsorCoordinator}</Typography>
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
                            <Twitter color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Twitter Link : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {sponsortwitterLink}</Typography>
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
                            <LinkedIn color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Linkedin Link : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {sponsorlinkedinLink}</Typography>
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
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Sponsor Location : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {location}</Typography>
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
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {sponsorInfo}</Typography>
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
                            <MonetizationOn color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Budget : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {budget}</Typography>
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
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Interested Theme : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {interestedtheme}</Typography>
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
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {sponsorEmail}</Typography>
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
                            <Construction color="primary"  />
                             <Typography variant={isNonMobile? "h5": ""} color="grey" fontWeight="500">Industry : </Typography>
                             <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {industry}</Typography>
                             </Box>
                             
                            <Typography variant={isNonMobile? "h4": "h5"} color={dark} fontWeight="500">Phone Numbers :</Typography>
                            {sponsorphoneNumber.map((phoneNumber, index) => (
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
                                        <Phone color="primary"  />
                                         <Typography variant={isNonMobile? "h5": ""}  fontWeight="500"> {phoneNumber.phoneNumber}</Typography>
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
                             <CardTravel color="primary"  />
                             <TextField  name="sponsorName" fullWidth label="Sponsor Name" value={sponsorName} onChange={handleChange} />
                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <AccountCircle color="primary"></AccountCircle>
                             <TextField name="sponsorCoordinator" fullWidth label="Sponsor Coordinator" value={sponsorCoordinator} onChange={handleChange} />
                             </Box>
                             
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <Twitter color="primary"></Twitter>
                             <TextField name="sponsortwitterLink" fullWidth label="Twitter Link" value={sponsortwitterLink} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                                <LinkedIn color="primary"></LinkedIn>
                             <TextField name="sponsorlinkedinLink" fullWidth label="Linkedin Link" value={sponsorlinkedinLink} onChange={handleChange} />

                             </Box>

                             <Box  alignItems={"center"} display={"flex"} gap={1}>
                                <LocationOn color="primary"></LocationOn>
                             <TextField name="location" fullWidth label=" Sponsor Location" value={location} onChange={handleChange} />

                             </Box>
                            

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <BorderColor color="primary"  />

                             <TextField fullWidth name="sponsorInfo" label=" Sponsor Description" value={sponsorInfo} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <MonetizationOn color="primary" />

                             <TextField fullWidth name="budget" label=" Budget" value={budget} onChange={handleChange} />

                             </Box>

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Category color="primary" />

                             <TextField fullWidth name="interestedtheme" label="Interested Theme" value={interestedtheme} onChange={handleChange} />

                             </Box>

                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Email color="primary"  />   
                             <TextField  fullWidth name="sponsorEmail" label="Email" value={sponsorEmail} onChange={handleChange} />

                             </Box>
                             <Box alignItems={"center"} display={"flex"} gap={1}>
                             <Construction color="primary"  />   
                             <TextField  fullWidth name="industry" label="Industry" value={industry} onChange={handleChange} />

                             </Box>

                                <Typography variant="h4" color={dark} fontWeight="500">Phone Numbers:</Typography>
                                {sponsorphoneNumber.map((phoneNumber, index) => (
                                    <Box alignItems={"center"} display={"flex"} gap={1}>
                                    <Phone color="primary"></Phone>
                                    <TextField fullWidth
                                    label={`Phone Number ${index + 1}`}
                                        key={index}
                                        value={phoneNumber.phoneNumber}
                                        onChange={(e) => handleSponsorPhoneNumberChange(index, e.target.value)}
                                    />
                                    <Button onClick={() => handleDeleteSponsorPhoneNumber(index)}>Delete</Button>

                                    </Box>
                                   
                                ))}
                                <Button  onClick={handleAddSponsorPhoneNumber}> + Add Phone Number</Button>

                             
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
  )
}

export default SponsorEditForm