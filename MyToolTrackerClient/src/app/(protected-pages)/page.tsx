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
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Construction, Work } from "@mui/icons-material";
import { Span } from "next/dist/trace";

const projectService = new ProjectService();
const employeeService = new EmployeeService();
const toolService = new ToolService();
const orderRequestService = new OrderRequestService();
const companyService = new CompanyService(); // New instance for company service

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [orderRequests, setOrderRequests] = useState<OrderRequest[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]); // New state for companies

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await projectService.getProjects();
        const fetchedEmployees = await employeeService.getEmployees();
        const fetchedTools = await toolService.getTools();
        const fetchedOrderRequests =
          await orderRequestService.getOrderRequests();
        const fetchedCompanies = await companyService.getCompanies(); // Fetch companies

        setProjects(fetchedProjects);
        setEmployees(fetchedEmployees);
        setTools(fetchedTools);
        setOrderRequests(fetchedOrderRequests);
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                  <RequestPageIcon color="primary" fontSize="large" />
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
                  <GroupIcon color="primary" fontSize="large" />
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
                  <BusinessIcon color="primary" fontSize="large" />
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

        {/* Company Statistics */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
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
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              <ListItem>
                <EventIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Company Meeting"
                  secondary="July 10, 2024"
                />
              </ListItem>
              <ListItem>
                <EventIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Project Deadline"
                  secondary="July 15, 2024"
                />
              </ListItem>
              <ListItem>
                <EventIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText
                  primary="Tool Maintenance"
                  secondary="July 20, 2024"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Tips and Tricks */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tips and Tricks
            </Typography>
            <List>
              <ListItem>
                <LightbulbIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText primary="Tip 1: Use the auto suggestion feature to add order requests quickly." />
              </ListItem>
              <ListItem>
                <LightbulbIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText primary="Tip 2: You can sort and filter table data by using action buttons in the table header." />
              </ListItem>
              <ListItem>
                <LightbulbIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText primary="Tip 3: Utilize the notifications to stay on top of order requests." />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(HomePage);
