import {
    AddOutlined,
      EditOutlined,
      DeleteOutlined,
      AttachFileOutlined,
      GifBoxOutlined,
      ImageOutlined,
      MicOutlined,
      MoreHorizOutlined,
      YouTube,
      Language,
      AccountCircle,
      CardTravel,
      Construction,
      LinkedIn,
      Twitter,
      Phone
  } from "@mui/icons-material";
  import { Box, Divider, Typography, InputBase, useTheme, Button , IconButton , useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import { LocalPhone } from "@mui/icons-material";
import { BorderColor } from "@mui/icons-material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalActivity from "@mui/icons-material/LocalActivity";
import FlexBetween from "components/FlexBetween";
import { Category } from "@mui/icons-material";
import { Star } from "@mui/icons-material";
import { Email } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import { InsertInvitation } from "@mui/icons-material";
import { Celebration } from "@mui/icons-material";
import { MonetizationOn } from "@mui/icons-material";
import { Storefront } from "@mui/icons-material";
import { Description } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { setSponsors } from "state";

const MySponsorWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [sponsorInfo, setSponsorInfo] = useState("");    
    const [sponsorName , setSponsorName] = useState("");  
    const[sponsorLocation, setSponsorLocation] = useState("");
    const [budget, setBudget] = useState("");
    const[interestedtheme, setInterestedTheme] = useState("");
    const [sponsorphoneNumber, setSponsorPhoneNumber] = useState([])
    const[sponsorEmail, setSponsorEmail] = useState("");
    const [sponsorlinkedinLink, setSponsorLinkedinLink] = useState("");
    const [ sponsortwitterLink, setSponsorTwitterLink] = useState("");
    const [sponsorCoordinator, setSponsorCoordinator] = useState("");
    const [industry, setIndustry] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const addSponsorPhoneNumber=()=>{
        setSponsorPhoneNumber([...sponsorphoneNumber , {phoneNumber:""}]);
      }

      const handleSponsorPhoneNumberChange=(index, field, value)=>{
        const updatedSponsorPhoneNumber=[...sponsorphoneNumber];
        updatedSponsorPhoneNumber[index][field] = value;
        setSponsorPhoneNumber(updatedSponsorPhoneNumber);
      }
      const handleSnackbarOpen = () => {
        setOpenSnackbar(true);
      };
      const removeSponsorPhoneNumber = (index) => {
        const updatedSponsorPhoneNumber = [...sponsorphoneNumber];
        updatedSponsorPhoneNumber.splice(index, 1); // Remove the highlight at the specified index
        setSponsorPhoneNumber(updatedSponsorPhoneNumber);
    };
    const handleSnackbarClose = (sponsor, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpenSnackbar(false);
      };
      const handleSponsor = async() =>{
      
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("sponsorName", sponsorName);
      formData.append("sponsorInfo", sponsorInfo);
      formData.append("location", sponsorLocation);
      formData.append("sponsorEmail", sponsorEmail);
      formData.append("interestedtheme", interestedtheme);
      formData.append("industry", industry);
      formData.append("budget", budget);
      formData.append("sponsorlinkedinLink", sponsorlinkedinLink);
      formData.append("sponsortwitterLink", sponsortwitterLink);
      formData.append("sponsorCoordinator", sponsorCoordinator);
      sponsorphoneNumber.forEach((phoneNumber,index)=>{
        formData.append(`sponsorphoneNumber[${index}][phoneNumber]`, phoneNumber.phoneNumber);
      })
      if(image){
        formData.append("picture", image);
        formData.append("sponsorpicturePath", image.name);
    }
    const response = await fetch(`http://localhost:3001/sponsors`,{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
        const sponsors = await response.json();
        dispatch(setSponsors({sponsors}));
        setImage(null);
        setBudget("");
        setIndustry("");
        setInterestedTheme("");
        setSponsorLinkedinLink("");
        setSponsorTwitterLink("");
        setSponsorEmail("");
        setSponsorInfo("");
        setSponsorLocation("");
        setSponsorCoordinator("");
        setSponsorName("");
        setSponsorPhoneNumber([]);
        handleSnackbarOpen();
    }

  return (
    <WidgetWrapper width={isNonMobileScreens? "50%" : "100%"}>
  <Box display={"flex"} justifyContent="center" alignItems="center" gap={5}  >
        <UserImage image={picturePath}></UserImage>
        <Typography  fontSize={"3rem"}>Sponsor Form</Typography>
    </Box>
    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
      <CardTravel color="primary" fontSize="large" />
      <InputBase
        placeholder="write down Sponsor Name"
        onChange={(e) => setSponsorName(e.target.value)}
        value={sponsorName}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
      />
    </Box>
     <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
      <AccountCircle color="primary" fontSize="large" />
      <InputBase
        placeholder="write down sponsor coordinator's name"
        onChange={(e) => setSponsorCoordinator(e.target.value)}
        value={sponsorCoordinator}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <LocationOn color="primary" fontSize="large" />
      <InputBase
        placeholder="write down sponsor location"
        onChange={(e) => setSponsorLocation(e.target.value)}
        value={sponsorLocation}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>

    <Box display="flex" alignItems="center" marginBottom="1rem">
      <BorderColor color="primary" fontSize="large" />
      <InputBase
        placeholder="write down sponsor information"
        onChange={(e) => setSponsorInfo(e.target.value)}
        value={sponsorInfo}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Email color="primary" fontSize="large" />
      <InputBase
        placeholder="write down sponsor email"
        onChange={(e) => setSponsorEmail(e.target.value)}
        value={sponsorEmail}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Category color="primary" fontSize="large" />
      <InputBase
        placeholder="write down interested theme"
        onChange={(e) => setInterestedTheme(e.target.value)}
        value={interestedtheme}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <MonetizationOn color="primary" fontSize="large"/>
      <InputBase
        placeholder="write down  budget"
        onChange={(e) => setBudget(e.target.value)}
        value={budget}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Construction color="primary" fontSize="large"/>
      <InputBase
        placeholder="write down  industry"
        onChange={(e) => setIndustry(e.target.value)}
        value={industry}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <LinkedIn color="primary" fontSize="large"/>
      <InputBase
        placeholder="Linkedin Link"
        onChange={(e) => setSponsorLinkedinLink(e.target.value)}
        value={sponsorlinkedinLink}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Twitter color="primary" fontSize="large"/>
      <InputBase
        placeholder="Twitter Link"
        onChange={(e) => setSponsorTwitterLink(e.target.value)}
        value={sponsortwitterLink}
        sx={{
          width: '100%',
          backgroundColor: '#080808',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input
        }}
      />
    </Box>
      {/* Highlights input */}
      {sponsorphoneNumber.map((phoneNumber, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="1rem">
          <Phone color="primary" fontSize="large" />
          <InputBase
            placeholder={`Sponsor Phone Number ${index + 1}`}
            value={phoneNumber.phoneNumber}
            onChange={(e) => handleSponsorPhoneNumberChange(index, 'phoneNumber', e.target.value)}
            sx={{
              width: '100%',
              backgroundColor: '#080808',
              borderRadius: '2rem',
              padding: '1rem 2rem',
              marginLeft: '1rem', // Add margin to create space between the icon and the input
            }}
          />
           <IconButton onClick={() => removeSponsorPhoneNumber(index)}>
                    <DeleteOutlined />
                </IconButton>
        </Box>
      ))}
   <Button onClick={addSponsorPhoneNumber}   >
      <AddOutlined /> <Typography >Add Sponsor Phone Number</Typography>
    </Button>
    {isImage && (
        <Box  
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt='1rem'
        p='1rem'

        >
            <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
    )}
    
                  

    <Divider sx={{margin: "1.25rem 0"}}></Divider>

    <FlexBetween>
        <FlexBetween gap={"0.25rem"} onClick={()=> setIsImage(!isImage)}>
                 <ImageOutlined sx={{color: mediumMain}}></ImageOutlined>   
                    <Typography color={mediumMain}
                    sx={{"&:hover":{cursor:"pointer", color: medium}}}
                    >
                         Sponsor Logo
                    </Typography>
        </FlexBetween>
        
        

       

       
        <Button
          disabled={!sponsorInfo}
          onClick={handleSponsor}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
    </FlexBetween>
    <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity="success"
  >
    Sponsor created successfully go to home page
  </MuiAlert>
</Snackbar>
    </WidgetWrapper>
  )
}

export default MySponsorWidget