import { Lightbulb } from "@mui/icons-material";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const TipsAndTricks = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tips and Tricks
      </Typography>
      <List>
        <ListItem>
          <Lightbulb color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Tip 1: Use the auto suggestion feature to add order requests quickly." />
        </ListItem>
        <ListItem>
          <Lightbulb color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Tip 2: You can sort and filter table data by using action buttons in the table header." />
        </ListItem>
        <ListItem>
          <Lightbulb color="primary" sx={{ mr: 2 }} />
          <ListItemText primary="Tip 3: Utilize the notifications to stay on top of order requests." />
        </ListItem>
      </List>
    </Paper>
  );
};

export default TipsAndTricks;
