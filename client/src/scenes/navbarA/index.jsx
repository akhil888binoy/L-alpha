import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery, Button
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavbarA = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;


  return (
    <FlexBetween padding="1rem 6%"  sx={{
    background: "#080808",
  }}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
        Loot
        </Typography>
        
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          
          <Button onClick={() => navigate(`/login`)} >
          <Typography color={"white"} sx={{
        fontSize: "14px",
        fontWeight: 'medium',
      }} >Login</Typography>
          </Button>
          <Button  onClick={() => navigate("/login")}>
          <Typography  color={"white"} sx={{
        fontSize: "14px",
        fontWeight: 'medium',
      }}>Events</Typography>
          </Button>
            
            <Typography  onClick={() => navigate("/login")} color={"white"} sx={{
        fontSize: "14px",
        fontWeight: 'medium',
      }}>Sponsors</Typography>
      <Button>
      <Typography color={"white"} sx={{
        fontSize: "14px",
        fontWeight: 'medium',
      }}>About Us</Typography>
      </Button>
           <Button>
           <Typography color={"white"} sx={{
        fontSize: "14px",
        fontWeight: 'medium',
      }}>Terms & Conditions</Typography>
         
           </Button>
           
             
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
           
            <Typography>Home</Typography>
            <Typography>Events</Typography>
            <Typography>Sponsors</Typography>
            <Typography>About Us</Typography>
            <Typography>Terms & Conditions</Typography>
             
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavbarA;