import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../../../state/context";
import { ProgressCircle } from "../../../../../common/progress-circle";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const StatBox = ({ children }: Props) => {
  return (
    <Box
      width="100%"
      sx={{
        boxShadow: 2,
        transition: "box-shadow 0.3s", // Add transition property for smooth effect
        "&:hover": {
          boxShadow: 1, // Change boxShadow on hover
          cursor: 'pointer'
        },
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" bgcolor="#EFF2F7" padding={2}>
        {children}
      </Box>
    </Box>
  );
};
