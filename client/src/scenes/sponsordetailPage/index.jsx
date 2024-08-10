import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SponsordetailWidget from 'scenes/widgets/SponsordetailWidget'
import { setSponsor } from 'state';

const SponsorDetailPage = () => {

  const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const {sponsorId} = useParams();
  const token = useSelector((state) => state.token);
  const sponsors = useSelector((state)=>state.sponsors.sponsors);
  const currentSponsor = sponsors.find((sponsor) => sponsor._id === sponsorId);

  const getSponsor = async()=>{
    const response = await fetch (`http://localhost:3001/sponsors/${sponsorId}/sponsor`, {
      method: "GET",
      headers:{Authorization :  `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setSponsor({sponsor : data}));
  }
  useEffect(() => {
    getSponsor();
  }, [sponsorId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box>
    <Navbar></Navbar>
    <Box> 
      {
        currentSponsor && (
          <SponsordetailWidget 
          sponsorId={currentSponsor._id}
           sponsorpicturePath={currentSponsor.sponsorpicturePath} 
           userId = {currentSponsor.userId}
           sponsorName = {currentSponsor.sponsorName}
           sponsorphoneNumber = {currentSponsor.sponsorphoneNumber}
           interestedtheme = {currentSponsor.interestedtheme}
           sponsorInfo = {currentSponsor.sponsorInfo}
           location = {currentSponsor.location}
           sponsorEmail = {currentSponsor.sponsorEmail}
           budget = {currentSponsor.budget}
           industry = {currentSponsor.industry}
           sponsortwitterLink = {currentSponsor.sponsortwitterLink}
           sponsorlinkedinLink = {currentSponsor.sponsorlinkedinLink}
           sponsorCoordinator= {currentSponsor.sponsorCoordinator}
          ></SponsordetailWidget>
        )
      }    
     
    </Box>

</Box>
  )
}

export default SponsorDetailPage