"use client";

import withAuth from "@/hoc/withAuth";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "@/components/Footer";
import QuickLinks from "@/components/QuickLinks";
import Statistics from "@/components/Statistics";
import RecentActivities from "@/components/RecentActivities";
import UpcomingEvents from "@/components/UpcomingEvents";
import TipsAndTricks from "@/components/TipsAndTricks";

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to{" "}
        <Box
          component="span"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          MyToolTracker
        </Box>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Manage your company&apos;s tools, projects, employees, and more
        efficiently.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Quick Links */}
        <Grid item xs={12}>
          <QuickLinks />
        </Grid>

        {/* Statistics and Recent Activities */}
        <Grid item xs={12} lg={8}>
          <Statistics />
          <RecentActivities />
        </Grid>

        {/* Upcoming Events and Tips and Tricks */}
        <Grid item xs={12} lg={4}>
          <UpcomingEvents />
          <TipsAndTricks />
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default withAuth(HomePage);
