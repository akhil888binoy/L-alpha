import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Theme = ({ filterTheme, themes, setFilterTheme }) => {
  const handleThemeChange = (event) => {
    setFilterTheme(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth={"100%"}>
      <InputLabel id="theme-label">Filter by Theme</InputLabel>
      <Select
        labelId="theme-label"
        id="theme-select"
        multiple
        value={filterTheme}
        onChange={handleThemeChange}
        label="Filter by Theme"
        renderValue={(selected) => selected.join(", ")}
      >
        {themes.map((theme) => (
          <MenuItem key={theme} value={theme}>
            {theme}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Theme;
