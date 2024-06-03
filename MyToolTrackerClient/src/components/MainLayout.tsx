"use client";

import React, { useState } from "react";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import AuthProvider from "../contexts/AuthContext"; // Import your AuthProvider component
import Navbar from "./Navbar"; // Import your Navbar component
import Sidebar from "./Sidebar"; // Import your Sidebar component
import theme from "@/theme/theme";

const drawerWidth = 240;

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
          <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              paddingTop: "80px",
              transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              marginLeft: `-${drawerWidth}px`,
              ...(open && { marginLeft: 0 }),
            }}
          >
            {children}
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Box>
  );
};

export default MainLayout;
