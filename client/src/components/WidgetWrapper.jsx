import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  backgroundColor: "#111111",
  border:"0.1rem solid #1E1E1E",
  borderRadius: 6
}));

export default WidgetWrapper;
