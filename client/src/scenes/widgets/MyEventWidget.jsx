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
    AccountCircle
} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button , IconButton , useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import { LocalPhone } from "@mui/icons-material";
import { BorderColor } from "@mui/icons-material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
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


const MyEventWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");    
    const [eventName , setEventName] = useState("");  
    const[eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate]= useState("");  
    const [ticketSold, setTicketSold] = useState("");
    const [eventPhoneNumber, setEventPhoneNumber]= useState("");  
    const[eventTheme, setEventTheme] = useState("");
    const[eventEmail, setEventEmail] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [ youtubeLink, setYoutubeLink] = useState("");
    const [eventCoordinator, setEventCoordinator] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const [highlights, setHighlights] = useState([])
    const [marketingPlans, setMarketingPlans] = useState([]); // State to store marketing plans

    // Function to add a marketing plan
    const addMarketingPlan = () => {
      setMarketingPlans([...marketingPlans, { budget: "", heading: "", description: "" }]);
    };
const addHighlight=()=>{
  setHighlights([...highlights , {highlight:""}]);
}
    // Function to handle changes in marketing plan inputs
    const handleMarketingPlanChange = (index, field, value) => {
      const updatedPlans = [...marketingPlans];
      updatedPlans[index][field] = value;
      setMarketingPlans(updatedPlans);
    };

    const handleHighlightChange=(index, field, value)=>{
      const updatedHighlights=[...highlights];
      updatedHighlights[index][field] = value;
      setHighlights(updatedHighlights);
    }

    const handleSnackbarOpen = () => {
      setOpenSnackbar(true);
    };
    const removeHighlight = (index) => {
      const updatedHighlights = [...highlights];
      updatedHighlights.splice(index, 1); // Remove the highlight at the specified index
      setHighlights(updatedHighlights);
  };
  const removeMarketingPlan = (index) => {
    const updatedPlans = [...marketingPlans];
    updatedPlans.splice(index, 1); // Remove the marketing plan at the specified index
    setMarketingPlans(updatedPlans);
};

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      setOpenSnackbar(false);
    };
    
    const handleEvent = async() =>{
      
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", description);
        formData.append("eventName", eventName);
        formData.append('date', eventDate);
        formData.append("eventLocation", eventLocation);
        formData.append("eventPhoneNumber", eventPhoneNumber);
        formData.append("theme", eventTheme);
        formData.append("email", eventEmail);
        formData.append("ticketSold", ticketSold);
        formData.append("youtubeLink", youtubeLink);
        formData.append("websiteLink", websiteLink);
        formData.append("eventCoordinator", eventCoordinator);
           // Append marketing plans to formData
           marketingPlans.forEach((plan, index) => {
            formData.append(`marketingPlans[${index}][budget]`, plan.budget);
            formData.append(`marketingPlans[${index}][heading]`, plan.heading);
            formData.append(`marketingPlans[${index}][description]`, plan.description);
          });

          highlights.forEach((highlight,index)=>{
            formData.append(`highlights[${index}][highlight]`, highlight.highlight);
          })
  
        if(image){
            formData.append("picture", image);
            formData.append("bannerpicturePath", image.name);
        }
        
       
        
      
        const response = await fetch(`http://localhost:3001/events`,{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
        const events = await response.json();
        dispatch(setEvents({events}));
        setImage(null);
        setDescription("");
        setEventName("");
        setEventDate("");
        setEventLocation("");
        setEventPhoneNumber("");
        setEventEmail("");
        setEventTheme("");
        setTicketSold("");
        setWebsiteLink("");
        setYoutubeLink("");
        setEventCoordinator("");
        setMarketingPlans([]); // Reset marketing plans after submission
        setHighlights([]);
        handleSnackbarOpen();

    }

   
  return (
    <WidgetWrapper width={isNonMobileScreens? "50%" : "100%"}>
    <Box display={"flex"} justifyContent="center" alignItems="center" gap={5}  >
        <UserImage image={picturePath}></UserImage>
        <Typography  fontSize={"3rem"}>Event Form</Typography>
    </Box>
   
    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
      <Celebration color="primary" fontSize="large" />
      <InputBase
        placeholder="write down event Name"
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
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
        placeholder="write down event coordinator's name"
        onChange={(e) => setEventCoordinator(e.target.value)}
        value={eventCoordinator}
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
      <InsertInvitation color="primary" fontSize="large" />
      <InputBase
        placeholder="write down event date in DD/MM/YY"
        onChange={(e) => setEventDate(e.target.value)}
        value={eventDate}
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
        placeholder="write down event location"
        onChange={(e) => setEventLocation(e.target.value)}
        value={eventLocation}
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
        placeholder="write down event description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
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
        placeholder="write down event email"
        onChange={(e) => setEventEmail(e.target.value)}
        value={eventEmail}
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
      <LocalPhone color="primary" fontSize="large" />
      <InputBase
        placeholder="write down event phone number"
        onChange={(e) => setEventPhoneNumber(e.target.value)}
        value={eventPhoneNumber}
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
        placeholder="write down event theme"
        onChange={(e) => setEventTheme(e.target.value)}
        value={eventTheme}
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
      <LocalActivity color="primary" fontSize="large"/>
      <InputBase
        placeholder="write down ticket sold"
        onChange={(e) => setTicketSold(e.target.value)}
        value={ticketSold}
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
      <YouTube color="primary" fontSize="large"/>
      <InputBase
        placeholder="Youtube Link"
        onChange={(e) => setYoutubeLink(e.target.value)}
        value={youtubeLink}
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
      <Language color="primary" fontSize="large"/>
      <InputBase
        placeholder="Website Link"
        onChange={(e) => setWebsiteLink(e.target.value)}
        value={websiteLink}
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
        {highlights.map((highlight, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="1rem">
          <Star color="primary" fontSize="large" />
          <InputBase
            placeholder={`Event highlight ${index + 1}`}
            value={highlight.highlight}
            onChange={(e) => handleHighlightChange(index, 'highlight', e.target.value)}
            sx={{
              width: '100%',
              backgroundColor: '#080808',
              borderRadius: '2rem',
              padding: '1rem 2rem',
              marginLeft: '1rem', // Add margin to create space between the icon and the input
            }}
          />
           <IconButton onClick={() => removeHighlight(index)}>
                    <DeleteOutlined />
                </IconButton>
        </Box>
      ))}

        {marketingPlans.map((plan, index) => (
      <Box key={index}>
        <Box display={"flex"} textAlign={"center"} gap={1}>
          <Typography fontSize={"1.5rem"} >Marketing Plan {index+1}</Typography>
        <IconButton onClick={() => removeMarketingPlan(index)}>
                        <DeleteOutlined />
                    </IconButton>
        </Box>
        <Box  display="flex" alignItems="center" marginBottom="1rem" mt={2}>
          <MonetizationOn color="primary" fontSize="large"></MonetizationOn>
        <InputBase
          placeholder={`Budget of Marketing Plan ${index + 1}`}
          value={plan.budget}
          onChange={(e) => handleMarketingPlanChange(index, 'budget', e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: '#080808',
            borderRadius: '2rem',
            padding: '1rem 2rem',
            marginLeft: '1rem', 
          }}
        />
        </Box>
       <Box  display="flex" alignItems="center" marginBottom="1rem">
        <Storefront color="primary" fontSize="large"></Storefront>
       <InputBase
           placeholder={`Heading of Marketing Plan ${index + 1}`}
          value={plan.heading}
          onChange={(e) => handleMarketingPlanChange(index, 'heading', e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: '#080808',
            borderRadius: '2rem',
            padding: '1rem 2rem',
            marginLeft: '1rem', 
          }}
        />
       </Box>
        
        <Box  display="flex" alignItems="center" marginBottom="1rem">
          <Description color="primary" fontSize="large"></Description>
        <InputBase
           placeholder={`Description of Marketing Plan ${index + 1}`}
          value={plan.description}
          onChange={(e) => handleMarketingPlanChange(index, 'description', e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: '#080808',
            borderRadius: '2rem',
            padding: '1rem 2rem',
            marginLeft: '1rem', 
          }}
        />
        </Box>
        
       
      </Box>
    ))}

    {/* Button to add more marketing plans */}
    <Button onClick={addMarketingPlan} >
      <AddOutlined /><Typography>Add event marketing Plan</Typography>
    </Button>

    <Button onClick={addHighlight}   >
      <AddOutlined /> <Typography >Add Event Highlights</Typography>
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
                         BannerImage
                    </Typography>
        </FlexBetween>
        
        

       

       
        <Button
          disabled={!description}
          onClick={handleEvent}
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
    Event created successfully go to home page
  </MuiAlert>
</Snackbar>

    </WidgetWrapper>
  )
}

export default MyEventWidget