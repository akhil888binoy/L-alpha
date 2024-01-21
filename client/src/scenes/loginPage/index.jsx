import { Box, Typography, useTheme, useMediaQuery, withTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box height={"1000px"} backgroundColor={"#18001A"} >
      

      <Box display="flex">
        { isNonMobileScreens
        && (
          <Box flex={1} textAlign={"center"} mt={"1rem"} >
      <Typography fontWeight="bold" fontSize="10rem"  sx={{
        background: "linear-gradient(90deg, #8A3192 41.94%, #37C2D9 60.03%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}>
          L O
        </Typography>
        <Typography fontWeight="bold" fontSize="10rem" sx={{
        background: "linear-gradient(90deg, #8A3192 41.94%, #37C2D9 60.03%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}>
          O T
        </Typography>

      </Box>
        )
        }
      <Box  width={isNonMobileScreens ? "30%" : "93%"}  mr={isNonMobileScreens ? "5rem" : ""} ml={isNonMobileScreens ? "" : "1rem"}>
      <Box
     position="relative"
     flex={1}
     width={isNonMobileScreens ? "100%" : "100%"}
     p="2rem"
     m="2rem auto"
    
     borderRadius="1.5rem"
     backgroundColor="#18001A" // Set a suitable color for the dark background
     sx={{ border: 3,
     borderColor: 'primary.main' }}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color={"white"}>
          Welcome to Loot!
        </Typography>
        <Form />
      </Box>
      </Box>
      
    </Box>

      
    </Box>
  );
};

export default LoginPage;