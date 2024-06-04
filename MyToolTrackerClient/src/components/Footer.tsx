import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: "20px",
        textAlign: "center",
        marginTop: "auto", // Push footer to the bottom of the page
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} MyToolTracker. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
