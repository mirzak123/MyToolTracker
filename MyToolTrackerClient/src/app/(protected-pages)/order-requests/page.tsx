"use client";

import * as React from "react";
import RecordTable from "@/components/RecordTable";
import { OrderRequestService } from "@/services/orderRequestService";
import { OrderRequest } from "@/types/orderRequest";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import withAuth from "@/hoc/withAuth";
import { ToolService } from "@/services/toolService";
import { ProjectService } from "@/services/projectService";
import { EmployeeService } from "@/services/employeeService";

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "employeeId", headerName: "Employee ID", width: 70 },
  { field: "employeeName", headerName: "Employee Name", width: 150 },
  { field: "projectId", headerName: "Project ID", width: 70 },
  { field: "projectName", headerName: "Project Name", width: 150 },
  { field: "toolId", headerName: "Tool ID", width: 70 },
  { field: "toolName", headerName: "Tool Name", width: 150 },
  { field: "startDate", headerName: "Start Date", width: 150 },
  { field: "endDate", headerName: "End Date", width: 150 },
];

// Create an instance of the OrderRequestService
const orderRequestService = new OrderRequestService();
// Create an instance of the ToolService
const toolService = new ToolService();
// Create an instance of the ProjectService
const projectService = new ProjectService();
// Create an instance of the EmployeeService
const employeeService = new EmployeeService();

// Define an interface for OrderRequest with additional fields
interface OrderRequestExtra extends OrderRequest {
  employeeName: string;
  projectName: string;
  toolName: string;
}

const OrderRequestsPage = () => {
  // State to keep track of order requests
  const [orderRequests, setOrderRequests] = React.useState<OrderRequestExtra[]>(
    [],
  );

  const fetchData = async () => {
    try {
      const fetchedOrderRequests = await orderRequestService.getOrderRequests();
      const fetchedEmployees = await employeeService.getEmployees();
      const fetchedTools = await toolService.getTools();
      const fetchedProjects = await projectService.getProjects();

      // Map extra fields to order requests
      const orderRequestsExtra: OrderRequestExtra[] = fetchedOrderRequests.map(
        (orderRequest) => {
          const tool = fetchedTools.find((t) => t.id === orderRequest.toolId);
          const employee = fetchedEmployees.find(
            (e) => e.id === orderRequest.employeeId,
          );
          const project = fetchedProjects.find(
            (p) => p.id === orderRequest.projectId,
          );
          return {
            ...orderRequest,
            employeeName: employee
              ? `${employee.firstName} ${employee.lastName}`
              : "",
            toolName: tool?.name || "",
            projectName: project?.name || "",
          };
        },
      );

      setOrderRequests(orderRequestsExtra);
    } catch (error) {
      console.error("Error fetching order requests:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Order Requests</h1>
      <Box sx={{ width: "90%" }}>
        <RecordTable
          records={orderRequests}
          columns={columns}
          onDelete={orderRequestService.deleteOrderRequest}
          fetchData={fetchData}
          recordType="Order Request"
        />
      </Box>
    </main>
  );
};

export default withAuth(OrderRequestsPage);
