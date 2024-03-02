import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PhoneInTalkOutlined,
  PhoneOutlined,
  Twitter,
  LinkedIn,
  EmailOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField, Button, Link } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id); // Assuming you have a way to get the logged-in user's ID
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSave = async () => {
    // Send updated user details to backend for saving
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH", // Use PATCH method for partial updates
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user), // Send updated user object
      });
      setEditMode(false); // Disable edit mode after saving
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value, // Update user state as user types
    });
  };

  const {
    firstName,
    lastName,
    location,
    viewedProfile,
    impressions,
    friends,
    email,
    twitterLink,
    phoneNumber,
    linkedinLink,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            {!editMode ? ( // Display editable fields only if not in edit mode and if the logged-in user is viewing their own profile
              <>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {firstName} {lastName}
                </Typography>
              </>
            ) : (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={handleChange}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={handleChange}
                />
              </>
            )}
          </Box>
        </FlexBetween>
        {userId === loggedInUserId && !editMode && ( // Display edit button only if the logged-in user is viewing their own profile and if not in edit mode
          <ManageAccountsOutlined onClick={handleEdit} />
        )}
        {editMode && <Button onClick={handleSave} variant="outlined">Save</Button>} 
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          {!editMode ? (
            <Typography color={medium}>{location}</Typography>
          ) : (
            <TextField
              name="location"
              label="Location"
              value={location}
              onChange={handleChange}
            />
          )}
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PhoneOutlined fontSize="large" sx={{ color: main }} />
          {!editMode ? (
            <Typography color={medium}>{phoneNumber}</Typography>
          ) : (
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={phoneNumber}
              onChange={handleChange}
            />
          )}
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <EmailOutlined fontSize="large" sx={{ color: main }} />
          {!editMode ? (
            <Typography color={medium}>{email}</Typography>
          ) : (
            <TextField
              name="email"
              label="Email"
              value={email}
              onChange={handleChange}
            />
          )}
        </Box>
        
      </Box>
      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              {!editMode ? (
                
                <Typography color={main} fontWeight="500">
                  <Link href={twitterLink} target="_blank" rel="noopener noreferrer" underline="hover">
                  Twitter
                  </Link>
                </Typography>
              ) : (
                <TextField
                  name="twitterLink"
                  label="Twitter"
                  value={twitterLink}
                  onChange={handleChange}
                />
              )}
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {userId === loggedInUserId && !editMode && ( // Display edit button only if the logged-in user is viewing their own profile and if not in edit mode
            <EditOutlined sx={{ color: main }} onClick={handleEdit} />
          )}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              {!editMode ? (
                <Typography color={main} fontWeight="500">
                   <Link href={linkedinLink} target="_blank" rel="noopener noreferrer" underline="hover">
                  Linked in 
                  </Link>
                </Typography>
              ) : (
                <TextField
                  name="linkedinLink"
                  label="LinkedIn"
                  value={linkedinLink}
                  onChange={handleChange}
                />
              )}
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {userId === loggedInUserId && !editMode && ( // Display edit button only if the logged-in user is viewing their own profile and if not in edit mode
            <EditOutlined sx={{ color: main }} onClick={handleEdit} />
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
