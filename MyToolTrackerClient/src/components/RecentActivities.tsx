import { ActivityLogService } from "@/services/activityLogService";
import { ActivityLog } from "@/types/activityLog";
import {
  Business,
  Construction,
  Group,
  RequestPage,
  Work,
  Event,
} from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const activityLogService = new ActivityLogService();

const RecentActivities = () => {
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);

  const getActivityIcon = (activity: ActivityLog) => {
    switch (activity.entityType) {
      case "Tool":
        return <Construction color="primary" />;
      case "Project":
        return <Work color="primary" />;
      case "Employee":
        return <Group color="primary" />;
      case "Order Request":
        return <RequestPage color="primary" />;
      case "Company":
        return <Business color="primary" />;
      default:
        return <Event color="primary" />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedActivityLogs =
          await activityLogService.getRecentActivities();

        setRecentActivities(fetchedActivityLogs);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Paper sx={{ p: 2, maxHeight: "400px", overflow: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <List>
        {recentActivities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{ alignItems: "flex-start", paddingLeft: 0 }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ListItem sx={{ minWidth: "auto" }}>
                  {getActivityIcon(activity)}
                </ListItem>
              </Grid>
              <Grid item xs>
                <ListItemText
                  primary={activity.description}
                  secondary={`On ${new Date(activity.timestamp).toLocaleString()}`}
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivities;
