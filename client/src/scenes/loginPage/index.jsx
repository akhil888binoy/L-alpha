import { Box, Typography, useTheme, useMediaQuery, withTheme } from "@mui/material";
import Form from "./Form";
import NavbarA from "scenes/navbarA";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box height={"1000px"} backgroundColor={"#080808"} >
      <NavbarA></NavbarA>

      <Box display="flex">
        { isNonMobileScreens
        && (
          <Box flex={1} textAlign={"center"} mt={"1rem"} >
            <Box display={"flex"} gap={3} alignItems={"center"} justifyContent={"center"}>
            <Typography  fontSize="8rem" color={"primary"} >
         Welcome 
        </Typography>
        <Typography fontSize="8rem" >to</Typography>
            </Box>
     
        <Typography  color={"primary"} fontSize="10rem" >
         Loot
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
     backgroundColor="#111111" // Set a suitable color for the dark background
     border="0.1rem solid #1E1E1E">
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color={"white"}>
          Welcome to Loot !
        </Typography>
        <Form />
      </Box>
      </Box>
      
    </Box>

      
    </Box>
  );
};

export default LoginPage;