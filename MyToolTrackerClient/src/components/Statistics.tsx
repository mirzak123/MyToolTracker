import { CompanyService } from "@/services/companyService";
import { EmployeeService } from "@/services/employeeService";
import { OrderRequestService } from "@/services/orderRequestService";
import { ProjectService } from "@/services/projectService";
import { ToolService } from "@/services/toolService";
import { Company } from "@/types/company";
import { Employee } from "@/types/employee";
import { OrderRequest } from "@/types/orderRequest";
import { Project } from "@/types/project";
import { Tool } from "@/types/tool";
import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const projectService = new ProjectService();
const employeeService = new EmployeeService();
const toolService = new ToolService();
const orderRequestService = new OrderRequestService();
const companyService = new CompanyService();

const Statistics = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [orderRequests, setOrderRequests] = useState<OrderRequest[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await projectService.getProjects();
        const fetchedEmployees = await employeeService.getEmployees();
        const fetchedTools = await toolService.getTools();
        const fetchedOrderRequests =
          await orderRequestService.getOrderRequests();
        const fetchedCompanies = await companyService.getCompanies();

        setProjects(fetchedProjects);
        setEmployees(fetchedEmployees);
        setTools(fetchedTools);
        setOrderRequests(fetchedOrderRequests);
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error("Error fetching company statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Company Statistics
      </Typography>
      <Typography variant="body2">Tools: {tools.length}</Typography>
      <Typography variant="body2">Projects: {projects.length}</Typography>
      <Typography variant="body2">
        Order Requests: {orderRequests.length}
      </Typography>
      <Typography variant="body2">Employees: {employees.length}</Typography>
      <Typography variant="body2">Companies: {companies.length}</Typography>
    </Paper>
  );
};

export default Statistics;
