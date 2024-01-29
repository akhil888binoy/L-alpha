import {
  AddOutlined,
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button , IconButton , useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import FlexBetween from "components/FlexBetween";

const MyEventWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");    
    const [eventName , setEventName] = useState("");  
    const[eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate]= useState("");  
   
    const [eventPhoneNumber, setEventPhoneNumber]= useState("");  
    const[eventTheme, setEventTheme] = useState("");
    const[eventEmail, setEventEmail] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

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
       

    }

   
  return (
    <WidgetWrapper >
    <FlexBetween  >
        <UserImage image={picturePath}></UserImage>
    </FlexBetween>
   
   
    <InputBase
          placeholder="write down event Name"
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
         <InputBase
          placeholder="write down event date"
          onChange={(e) => setEventDate(e.target.value)}
          value={eventDate}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
        <InputBase
          placeholder="write down event location"
          onChange={(e) => setEventLocation(e.target.value)}
          value={eventLocation}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
     <InputBase
          placeholder="write down event description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
         <InputBase
          placeholder="write down event email"
          onChange={(e) => setEventEmail(e.target.value)}
          value={eventEmail}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
        <InputBase
          placeholder="write down event phone number"
          onChange={(e) => setEventPhoneNumber(e.target.value)}
          value={eventPhoneNumber}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
        <InputBase
          placeholder="write down event theme"
          onChange={(e) => setEventTheme(e.target.value)}
          value={eventTheme}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginBottom:"1rem"

          }}
        />
       
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
    </WidgetWrapper>
  )
}

export default MyEventWidget