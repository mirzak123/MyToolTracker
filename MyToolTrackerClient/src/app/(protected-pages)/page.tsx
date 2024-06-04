"use client";

import withAuth from "@/hoc/withAuth";
import { EmployeeService } from "@/services/employeeService";
import { OrderRequestService } from "@/services/orderRequestService";
import { ProjectService } from "@/services/projectService";
import { ToolService } from "@/services/toolService";
import { CompanyService } from "@/services/companyService"; // New service for companies
import { Employee } from "@/types/employee";
import { OrderRequest } from "@/types/orderRequest";
import { Project } from "@/types/project";
import { Tool } from "@/types/tool";
import { Company } from "@/types/company"; // New type for companies
import { ActivityLog } from "@/types/activityLog";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Construction,
  Work,
  RequestPage,
  Group,
  Event,
  Lightbulb,
  Business,
} from "@mui/icons-material";
import { ActivityLogService } from "@/services/activityLogService";
import Footer from "@/components/Footer";

const projectService = new ProjectService();
const employeeService = new EmployeeService();
const toolService = new ToolService();
const orderRequestService = new OrderRequestService();
const companyService = new CompanyService();
const activityLogService = new ActivityLogService();

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [orderRequests, setOrderRequests] = useState<OrderRequest[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await projectService.getProjects();
        const fetchedEmployees = await employeeService.getEmployees();
        const fetchedTools = await toolService.getTools();
        const fetchedOrderRequests =
          await orderRequestService.getOrderRequests();
        const fetchedCompanies = await companyService.getCompanies();
        const fetchedActivityLogs =
          await activityLogService.getRecentActivities();

        setProjects(fetchedProjects);
        setEmployees(fetchedEmployees);
        setTools(fetchedTools);
        setOrderRequests(fetchedOrderRequests);
        setCompanies(fetchedCompanies);
        setRecentActivities(fetchedActivityLogs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                  <Typography variant="body2">
                    Manage your order requests.
                  </Typography>
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
                  <Typography variant="body2">
                    Manage your employees.
                  </Typography>
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
                  <Typography variant="body2">
                    Manage your companies.
                  </Typography>
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
        </Grid>

        {/* Statistics and Recent Activities */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Company Statistics
            </Typography>
            <Typography variant="body2">Tools: {tools.length}</Typography>
            <Typography variant="body2">Projects: {projects.length}</Typography>
            <Typography variant="body2">
              Order Requests: {orderRequests.length}
            </Typography>
            <Typography variant="body2">
              Employees: {employees.length}
            </Typography>
            <Typography variant="body2">
              Companies: {companies.length}
            </Typography>
          </Paper>

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
        </Grid>

        {/* Upcoming Events and Tips and Tricks */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              <ListItem>
                <Event color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Company Meeting"
                  secondary="July 10, 2024"
                />
              </ListItem>
              <ListItem>
                <Event color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Project Deadline"
                  secondary="July 15, 2024"
                />
              </ListItem>
              <ListItem>
                <Event color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Tool Maintenance"
                  secondary="July 20, 2024"
                />
              </ListItem>
            </List>
          </Paper>

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
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default withAuth(HomePage);
