import {
  Business,
  Construction,
  Group,
  RequestPage,
  Work,
} from "@mui/icons-material";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const QuickLinks = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={2}>
        <Card>
          <CardContent>
            <Construction color="primary" fontSize="large" />
            <Typography variant="h6">Tools</Typography>
            <Typography variant="body2">
              Manage and track all your tools.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/tools"
              sx={{ mt: 2 }}
            >
              Go to Tools
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <Card>
          <CardContent>
            <Work color="primary" fontSize="large" />
            <Typography variant="h6">Projects</Typography>
            <Typography variant="body2">
              View and manage ongoing projects.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/projects"
              sx={{ mt: 2 }}
            >
              Go to Projects
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <Card>
          <CardContent>
            <RequestPage color="primary" fontSize="large" />
            <Typography variant="h6">Order Requests</Typography>
            <Typography variant="body2">Manage your order requests.</Typography>
            <Button
              variant="contained"
              color="primary"
              href="/order-requests"
              sx={{ mt: 2 }}
            >
              Go to Order Requests
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <Card>
          <CardContent>
            <Group color="primary" fontSize="large" />
            <Typography variant="h6">Employees</Typography>
            <Typography variant="body2">Manage your employees.</Typography>
            <Button
              variant="contained"
              color="primary"
              href="/employees"
              sx={{ mt: 2 }}
            >
              Go to Employees
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <Card>
          <CardContent>
            <Business color="primary" fontSize="large" />
            <Typography variant="h6">Companies</Typography>
            <Typography variant="body2">Manage your companies.</Typography>
            <Button
              variant="contained"
              color="primary"
              href="/companies"
              sx={{ mt: 2 }}
            >
              Go to Companies
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default QuickLinks;
