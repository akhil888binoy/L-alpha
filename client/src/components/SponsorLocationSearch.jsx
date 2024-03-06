import React from "react";
import { TextField } from "@mui/material";
const SponsorLocationSearch = ({ value, onChange, placeholder }) => {
  const handleInputChange = (sponsor) => {
    onChange(sponsor.target.value);
  };

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      fullWidth
    />
  );
};

export default SponsorLocationSearch;
