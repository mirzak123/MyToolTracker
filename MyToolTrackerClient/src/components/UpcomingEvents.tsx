import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Event } from "@mui/icons-material";

const UpcomingEvents = () => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        <ListItem>
          <Event color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Company Meeting" secondary="July 10, 2024" />
        </ListItem>
        <ListItem>
          <Event color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Project Deadline" secondary="July 15, 2024" />
        </ListItem>
        <ListItem>
          <Event color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Tool Maintenance" secondary="July 20, 2024" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default UpcomingEvents;
