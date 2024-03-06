import React from 'react'
import Navbar from 'scenes/navbar'
import { Box , useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SponsordetailWidget from 'scenes/widgets/SponsordetailWidget'

const SponsorDetailPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const {sponsorId} = useParams();
    const [sponsor, setSponsor] = useState(null);
  const token = useSelector((state) => state.token);

  const getSponsor = async()=>{
    const response = await fetch (`http://localhost:3001/sponsors/${sponsorId}/sponsor`, {
      method: "GET",
      headers:{Authorization :  `Bearer ${token}`},
    });
    const data = await response.json();
    setSponsor(data);
  }
  useEffect(() => {
    getSponsor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!sponsor) return null;
  return (
    <Box>
    <Navbar></Navbar>
    <Box>     
      <SponsordetailWidget sponsorId={sponsorId} sponsorpicturePath={sponsor.sponsorpicturePath}  ></SponsordetailWidget>
    </Box>

</Box>
  )
}

export default SponsorDetailPage