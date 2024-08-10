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
import { Box, Divider, Typography, InputBase, useTheme, Button , IconButton , useMediaQuery, TextField } from "@mui/material";
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
import {loadStripe} from '@stripe/stripe-js';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import {  InputLabel, MenuItem, Select } from '@mui/material';
import { format } from "date-fns";



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
    const [paymentSuccess, setPaymentSuccess]=useState(false);
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
    const handlePayment = async () => {
      const stripe = await loadStripe('pk_test_51P50btSFd3O36VLznvz1ET1Ix0nrqmcdVr7n5Chn9bC3DvtyTluicCAwWomMOSy4L8csxV8mejvpVmRCGXACfDq900JTIwZm4H');
    
      const paymentResponse = await fetch(`http://localhost:3001/payment/create-checkout-session`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    
      const { id: sessionId } = await paymentResponse.json();
    
      const result = await stripe.redirectToCheckout({
        lineItems: [
          { price: 'price_1P9lCkSFd3O36VLzJyraEsTY', quantity: 1 },
        ],
        mode: 'payment',
        sessionId,
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/cancel',
      });
    if(!result.error){
      setPaymentSuccess(true);
    }
      if (result.error) {
        console.log(result.error);
        setPaymentSuccess(false);
      }
    };
    const handleEvent = async() =>{
      
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", description);
        formData.append("eventName", eventName);
        formData.append('date', format(eventDate, 'iiii, MMMM dd, yyyy'));
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
    // Validation for Input
    const isValidYoutubeLink = (link) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
      return youtubeRegex.test(link);
    };
    const isValidPhoneNum = (number) => {
      const phoneNumRegex = /^(\+?\d{1,3}[-.\s]?)?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/;
      return phoneNumRegex.test(number);
    };
  const isValidEmail=(email)=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const isValidDesc=(description)=>{
    const words = description.trim().split(/\s+/);
    return words.length <= 100;
  }
  const isValidWebsiteLink=(link)=>{
    const websiteRegex=/^(ftp|http|https):\/\/[^ "]+$/;
    return websiteRegex.test(link);
  }
  const isValidMarkDesc=(description)=>{
    const words=description.trim().split(/\s+/);
    return words.length <=50;
  }
  const isValidMarkHead=(heading)=>{
    const words=heading.trim().split(/\s+/);
    return words.length<=10;
  }
  const isValidEventHigh=(highlight)=>{
    const words=highlight.trim().split(/\s+/);
    return words.length<=50;
  }
  const isValidEventName=(name)=>{
    const words= name.trim().split(/\s+/);
    return words.length<=10;
  }
  const isValidEventCoord=(name)=>{
    const words= name.trim().split(/\s+/);
    return words.length <=10;
  }
  const isValidEventLoc=(location)=>{
    const words = location.trim().split(/\s+/)
    return words.length<=10;
  }
  // Theme List
    const eventThemes = [
      'Birthday',
      'Wedding',
      'Corporate',
      'Charity',
      'Festival',
      'Other',
    ];
  
  return (
    <WidgetWrapper width={isNonMobileScreens? "50%" : "100%"}>
    <Box display={"flex"} justifyContent="center" alignItems="center" gap={5}  >
        <UserImage image={picturePath}></UserImage>
        <Typography  fontSize={"3rem"}>Event Form</Typography>
    </Box>
   
    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <Celebration color="primry" fontSize="large" />

    </Box>
      
      <InputBase
      multiline
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
        helperText={eventName && !isValidEventName(eventName) ? 'max 10 words':''}
        error={eventName && !isValidEventName(eventName)}
      />
    </Box>

    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <AccountCircle  fontSize="large" />

    </Box>
      <InputBase
      multiline
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
        helperText={eventCoordinator && !isValidEventCoord(eventCoordinator)? 'max words 10':''}
        error={eventCoordinator && !isValidEventCoord(eventCoordinator)}
      />
    </Box>
    
    <Box mt={2} display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <InsertInvitation  fontSize="large" />

    </Box>
  <Box ml={4}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        type="date"
        value={eventDate}
        onChange={(newDate) => setEventDate(newDate)}
        renderInput={(params) => (
          <InputBase
            {...params}
            placeholder="Select event date"
            sx={{
              width: '100%',
              backgroundColor: '#080808',
              borderRadius: '2rem',
              padding: '1rem 2rem',
              marginLeft: '1rem',
            }}
          />
        )}
      />
    </LocalizationProvider>
  </Box>
</Box>

         
       <Box display="flex" alignItems="center" marginBottom="1rem">
       <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <LocationOn  fontSize="large" />

    </Box>
      <InputBase
      multiline
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
        helperText={eventLocation && !isValidEventLoc(eventLocation)? 'max 10 words': ''}
      />
    </Box>
       
        <Box display="flex" alignItems="center" marginBottom="1rem">
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <BorderColor  fontSize="large" />
    </Box>
      <TextField
      multiline
      fullWidth
        placeholder="write down event description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        sx={{ marginLeft: '1rem' }}
        helperText={
          description && !isValidDesc(description)
            ? 'Description must be 100 words or less'
            : ''
        }
        error={description && !isValidDesc(description)}


      />
    </Box>
    
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <Email  fontSize="large" />

    </Box>
      <TextField
      multiline
      fullWidth
        placeholder="write down event email"
        onChange={(e) => setEventEmail(e.target.value)}
        value={eventEmail}
        sx={{ marginLeft: '1rem' }}
     helperText={eventEmail && !isValidEmail(eventEmail) ? 'Add Valid Email':''}
     error={eventEmail && !isValidEmail(eventEmail)}
      />
    </Box>
         
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <LocalPhone  fontSize="large" />

    </Box>
  <TextField
    fullWidth
    multiline
    label="Event Phone Number"
    placeholder="Don't forget to add country code darling"
    value={eventPhoneNumber}
    onChange={(e) => setEventPhoneNumber(e.target.value)}
    sx={{ marginLeft: '1rem' }}
    variant="outlined"
    helperText={
      eventPhoneNumber && !isValidPhoneNum(eventPhoneNumber)
        ? 'Add a Valid Phone Number'
        : ''
    }
    error={eventPhoneNumber && !isValidPhoneNum(eventPhoneNumber)}
  />
</Box>


        
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
              <Category  fontSize="large" />

    </Box>
        <Select
          value={eventTheme}
          onChange={(e) => setEventTheme(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            width: '100%',
            backgroundColor: '#080808',
            borderRadius: '2rem',
            padding: '0.2rem ',
            marginLeft: '1rem',
            color: 'white',
          }}
        >
          <MenuItem value="" disabled>
            Select event theme
          </MenuItem>
          {eventThemes.map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
        </Select>
      </Box>
        
        <Box display="flex" alignItems="center" marginBottom="1rem">
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <LocalActivity  fontSize="large"/>

    </Box>
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
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <YouTube  fontSize="large"/>

    </Box>
      <TextField
      multiline
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
        helperText={
          youtubeLink && !isValidYoutubeLink(youtubeLink)
            ? 'Add a Valid YouTube Link'
            : ''
        }
        error={youtubeLink && !isValidYoutubeLink(youtubeLink)}
      />
    </Box>

    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <Language  fontSize="large"/>

    </Box>
      <TextField
      multiline
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
        helperText={websiteLink && !isValidWebsiteLink(websiteLink) ? 'Add a valid Website Link':''}
        error={websiteLink && !isValidWebsiteLink(websiteLink)}
      />
    </Box>
        
        {/* Highlights input */}
        {highlights.map((highlight, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="1rem">
          <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
                <Star  fontSize="large" />

    </Box>
          <TextField
          multiline
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
            helperText={highlight.highlight && !isValidEventHigh(highlight.highlight) ? 'Max 20 words':''}
            error={highlight.highlight && !isValidEventHigh(highlight.highlight)}
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
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
          <MonetizationOn  fontSize="large"></MonetizationOn>

    </Box>
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
       <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
              <Storefront  fontSize="large"></Storefront>

    </Box>
       <TextField
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
          multiline
          helperText={plan.heading && !isValidMarkHead(plan.heading) ? 'Max Words 20':''}
          error={plan.heading && !isValidMarkHead(plan.heading)}
        />
       </Box>
        
        <Box  display="flex" alignItems="center" marginBottom="1rem">
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
                <Description  fontSize="large"></Description>

    </Box>
        <TextField
        multiline
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
          helperText={plan.description && !isValidMarkDesc(plan.description)? 'max 50 words':''}
          error={plan.description && !isValidMarkDesc(plan.description)}
        />
        </Box>
        
       
      </Box>
    ))}

    {/* Button to add more marketing plans */}
    <Button onClick={addMarketingPlan} >
      <Typography color={"#834bff"}>+ Add event marketing Plan</Typography>
    </Button>

    <Button onClick={addHighlight}   >
     <Typography color={"#834bff"} > + Add Event Highlights</Typography>
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
          
          onClick={handleEvent}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        <Button
          
          onClick={handlePayment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Pay
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