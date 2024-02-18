import React from "react";
import { TextField } from "@mui/material";
const Search = ({ value, onChange, placeholder }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
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

export default Search;
