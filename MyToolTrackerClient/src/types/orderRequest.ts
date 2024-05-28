export interface OrderRequest {
  id: number;
  startDate: Date | string;
  endDate: Date | string;
  employeeId: number; // reference to the employee
  projectId: number; // reference to the project
  toolId: number; // reference to the tool
}
