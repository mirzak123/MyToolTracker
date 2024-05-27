import { Employee } from "@/types/employee";
import { EmployeeType } from "@/types/employeeType";
import api from "@/config/axios";

export interface IEmployeeService {
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee>;
  createEmployee(employee: Employee): Promise<void>;
  updateEmployee(employee: Employee): Promise<void>;
  deleteEmployee(id: number): Promise<void>;
  getEmployeeTypes(): Promise<EmployeeType[]>;
}

export class EmployeeService implements IEmployeeService {
  async getEmployees(): Promise<Employee[]> {
    const response = await api.get("/api/Employees");
    return response.data;
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await api.get(`/api/Employees/${id}`);
    return response.data;
  }

  async createEmployee(employee: Employee): Promise<void> {
    await api.post("/api/Employees", employee);
  }

  async updateEmployee(employee: Employee): Promise<void> {
    await api.put(`/api/Employees/${employee.id}`, employee);
  }

  async deleteEmployee(id: number): Promise<void> {
    await api.delete(`/api/Employees/${id}`);
  }

  async getEmployeeTypes(): Promise<EmployeeType[]> {
    const response = await api.get("/api/EmployeeTypes");
    return await response.data;
  }
}
