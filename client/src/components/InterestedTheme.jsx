import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const InterestedTheme = ({ filterInterestedTheme, interestedthemes, setFilterInterestedTheme }) => {
  const handleThemeChange = (sponsor) => {
    setFilterInterestedTheme(sponsor.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth={"100%"}>
      <InputLabel id="theme-label">Filter by Interested Theme of Sponsors</InputLabel>
      <Select
        labelId="theme-label"
        id="theme-select"
        multiple
        value={filterInterestedTheme}
        onChange={handleThemeChange}
        label="Filter by Interested Theme of Sponsors"
        renderValue={(selected) => selected.join(", ")}
      >
        {interestedthemes.map((interestedtheme) => (
          <MenuItem key={interestedtheme} value={interestedtheme}>
            {interestedtheme}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InterestedTheme;
