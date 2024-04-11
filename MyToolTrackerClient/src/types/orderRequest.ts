// U bazi: IZDAVANJE
//

export interface OrderRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  status: boolean;
  employeeId: number; // reference to the employee
  projectId: number;  // reference to the project
  toolId: number; // reference to the tool
}
