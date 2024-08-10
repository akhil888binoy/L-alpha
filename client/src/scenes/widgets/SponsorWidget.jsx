import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,   
    ShareOutlined,
  } from "@mui/icons-material";
  import { MonetizationOn } from "@mui/icons-material";
  import { Person } from "@mui/icons-material";
  import { NavLink } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import {CardMedia} from '@mui/material';
import {useMediaQuery} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { setSponsor } from "state";
import Button from '@mui/material/Button';
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
  
  const SponsorWidget = ({
    sponsorId,
    sponsorUserId,  
    sponsorName,  
    location,
    sponsorEmail,
    sponsorphoneNumber,
    sponsorInfo,
    interestedtheme,  
    sponsorpicturePath,
    budget,
   industry,
   sponsorCoordinator,
   sponsortwitterLink,
   sponsorlinkedinLink,
   likes
  }) => {

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
      const response = await fetch(`http://localhost:3001/sponsors/${sponsorId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedSponsor = await response.json();
      dispatch(setSponsor({ sponsor: updatedSponsor }));
     
  };

  const deleteSponsor = async () => {
      const response = await fetch(`http://localhost:3001/sponsors/${sponsorUserId}/${sponsorId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      dispatch(setSponsor({ sponsor: result }));
      navigate('/sponsordeletePage');

     
  };

  const words = sponsorInfo.split(" ");
  // Select the first 50 words
  const truncatedDescription = words.slice(0, 50).join(" ");

    return (
      <WidgetWrapper m="2rem 0" >
      <Box display="flex" flexDirection="column" alignItems="center">
          {sponsorpicturePath && (
              <img
                  width="100%"
                  height="100%"
                  alt="sponsor"
                  style={{ borderRadius: "0.75rem", }}
                  src={`http://localhost:3001/assets/${sponsorpicturePath}`}
              />
          )}
          <Box display={isNonMobileScreens? "flex":"block"} justifyContent="space-between" alignItems="center" width="100%" mt={"1rem"} gap={  1 }>
             
              <Box >
                  <Typography color={"white"} variant="h6" fontSize={isNonMobileScreens? "2rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                      {sponsorName}
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
                  <PlaceIcon  sx={{
        color: '#834bff',
      }} ></PlaceIcon>
                  <Typography color="white" variant="subtitle1" ml={"0.2rem"}>
                      {location}
                  </Typography>
              </Box>
          </Box>
          <Typography mt={"1rem"} color={"grey"}>
              {truncatedDescription}
              {words.length > 50 && " ..."} {/* Display ellipsis if the description has more than 50 words */}
              {words.length > 50 && <Button onClick={() => navigate(`/sponsors/${sponsorId}/sponsor`)}>
                  Read more
              </Button>}
          </Typography>
          
          
      </Box>
      <Box display="flex" justifyContent="space-between" mt="1rem" gap={2}>
          <Box display="flex" alignItems="center" >
              <IconButton onClick={patchLike}>
                  {isLiked ? <FavoriteOutlined sx={{ color: "#834bff" }} /> : <FavoriteBorderOutlined />}
              </IconButton>
              <Typography>{likeCount}</Typography>
          </Box>
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
                      {interestedtheme}
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
              <MonetizationOn sx={{
        color: '#834bff',
      }} ></MonetizationOn>
              <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                  {budget}
              </Typography>
          </Box>
          {sponsorUserId === loggedInUserId && (
              <Button 
              size="small"
                  variant="outlined" 
                  style={{
                      borderRadius: 6,
                      padding: "0.5rem 1rem",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor:"#834bff"
                  }} 
                  onClick={deleteSponsor}
              >
                  <Typography sx={{
                    color:"#834bff"
                  }} fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
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
                  backgroundColor: "#834bff", // Change background color here
                  
              }} 
              onClick={() => navigate(`/sponsors/${sponsorId}/sponsor`)}
          >
              <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                  Details
              </Typography>
          </Button>
      
      </Box>
      
  </WidgetWrapper>  
    )
  }
  
  export default SponsorWidget