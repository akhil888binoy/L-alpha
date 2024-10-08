import { Box, Typography, Divider, FormControl } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material';
import {Link} from "@mui/material";
import UserWidget from "./UserWidget";
import {InputBase} from "@mui/material";
import Event from "@mui/icons-material/Event";
import UserImage from "components/UserImage";
import {useMediaQuery} from "@mui/material";
import YouTube from "react-youtube";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Category, Construction, Language, LinkedIn, LocalActivity, LocationOn, MonetizationOn, Phone, Star, Twitter } from "@mui/icons-material";

const SponsordetailWidget = ({
  sponsorId,
  sponsorpicturePath,
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
}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
 const navigate = useNavigate();
 const token = useSelector((state)=> state.token);
 const loggedInUserId = useSelector((state) => state.user._id);
 const handleEditSponsor = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/sponsors/${sponsorId}/edit`);
  };  
   // eslint-disable-line react-hooks/exhaustive-deps

 return (
    <Box  bgcolor={"#080808"}>
        <Box>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                    width={isNonMobile ? "70%":"100%"}
                    height="70%"
                    alt="event"
                    style={{ borderRadius: "0.75rem" }}
                    src={`http://localhost:3001/assets/${sponsorpicturePath}`}
                />
            </Box>
            <Box textAlign="center" mt="1rem">
            <Typography color="white" variant={isNonMobile ? "h1" : "h2"}>{sponsorName}</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mt="1rem" gap={1}>
        <LinkedIn sx={{
          color:"#834bff"
        }} />
        <Typography color="white" variant={isNonMobile ? "h4" : "h7"}>
          <Link href={sponsorlinkedinLink} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
            Linkedin
          </Link>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt="1rem" gap={1}>
      <Twitter sx={{
        color:"#834bff"
      }}></Twitter>
        <Typography color="white" variant={isNonMobile ? "h4" : "h7"}>
          <Link href={sponsortwitterLink} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
            Twitter
          </Link>
        </Typography>
      </Box>
    </Box>
    {userId === loggedInUserId && (
                    <Button 
                    size="small"
                        variant="outlined" 
                        sx={{
                            borderRadius: 2,
                            padding: "0.5rem 1rem",
                            alignItems: "center",
                            justifyContent: "center",
                            borderColor:"#834bff"
                        }} 
                        onClick={handleEditSponsor}
                    >
                        <Typography sx={{
                          color:"#834bff"
                        }} fontSize={ "1rem" } >
                           Edit
                        </Typography>
                    </Button>
                )}
        {/* Description , ticketsold , date , theme, location and ticketsold  */}
<Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
<WidgetWrapper mt={"1rem"}  width={"80%"}>
<Box >
    <Typography fontSize={"1.2rem"}>{sponsorInfo}</Typography>
</Box>
<Box  mt={5} display={isNonMobile? "flex" : "block"} style={{  justifyContent: "center", alignItems: "center" }} gap={10}>
<Box gap={isNonMobile? "": 2} sx={{
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
   <MonetizationOn  sx={{ fontSize: 32, color:"#834bff" }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Budget</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{budget}</Typography> {/* Increase text size */}
</Box>

{interestedtheme.map((theme, index) => ( 
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
   <Category  sx={{ fontSize: 32 , color:"#834bff"}} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Interested Theme</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{theme.theme}</Typography> {/* Increase text size */}
</Box>

))}



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
   <LocationOn  sx={{ fontSize: 32, color:"#834bff" }} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Location</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{location}</Typography> {/* Increase text size */}
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
   <Construction  sx={{ fontSize: 32 , color:"#834bff"}} /> 
  <Typography mt={"0.3rem"} color={"grey"}>Industry</Typography> 
   </Box>
 {/* Increase icon size */}
  <Typography textAlign={"center"} mt={"0.5rem"} color="white" sx={{ fontSize: "1.2rem" }}>{industry}</Typography> {/* Increase text size */}
</Box>
</Box>

</WidgetWrapper>
</Box>

{/* Contact section  */}
<WidgetWrapper  mt={"1rem"}  width={ isNonMobile?  "40%" : "80%"}>
<Typography textAlign={"center"} variant="h3">Contact Info</Typography>
        <Box mt={2}>
        
        </Box>
         <Box mt={2} gap={2}  onClick={() => navigate(`/profile/${userId}/sponsor`)}>

         <FlexBetween fontSize={ isNonMobile? "1rem" : ""} >Sponsor Coordinator : {sponsorCoordinator}</FlexBetween>       
        <Typography color={"white"} fontSize={ isNonMobile? "1rem" : ""}> Email Id : {sponsorEmail} </Typography>
        <Box display={ "block"} gap={5} mt={"1rem"} >
         {sponsorphoneNumber.map((phoneNumber, index) => (
        <Box key={index} sx={{
         bgcolor: "#080808",
         padding: "0.5rem 1rem",
         borderRadius: "0.5rem",
         alignItems: "center",
         justifyContent: "center",
         overflow: "hidden",
         border: "0.1rem solid #1E1E1E",
         whiteSpace: "nowrap",
         textOverflow: "ellipsis",
         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
       }}   >
         <Box  display={"flex"} gap={1} alignItems={"center"}>
            <Phone color={"primary"}> </Phone>
         <Typography fontSize={ isNonMobile? "1.2rem": "1rem"}>  {phoneNumber.phoneNumber}</Typography>
         </Box>
        </Box>
      ))}
         </Box>
            </Box>
</WidgetWrapper>

</Box>
    </Box>
  )
}

export default SponsordetailWidget