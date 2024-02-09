import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  border: "5px solid", // Set solid border
  borderColor: "transparent", // Set border color to transparent to avoid a solid color border
  borderImage: "linear-gradient(to right, #6f42c1, #8e44ad) 1", // Purple Vader gradient border
}));

export default WidgetWrapper;
