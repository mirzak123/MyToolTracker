import { Employee } from '@/types/employee';
import { EmployeeType } from '@/types/employeeType';
import { BASE_URL } from '../../constants';

export interface IEmployeeService {
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee>;
  createEmployee(employee: Employee): Promise<void>;
  updateEmployee(employee: Employee): Promise<void>;
  deleteEmployee(id: number): Promise<void>;
}

export class EmployeeService implements IEmployeeService {
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(`${BASE_URL}/api/Employees`);
    return await response.json();
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await fetch(`${BASE_URL}/api/Employees/${id}`);
    return await response.json();
  }

  async createEmployee(employee: Employee): Promise<void> {
    await fetch(`${BASE_URL}/api/Employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(employee: Employee): Promise<void> {
    await fetch(`${BASE_URL}/api/Employees/${employee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: number): Promise<void> {
    await fetch(`${BASE_URL}/api/Employees/${id}`, {
      method: 'DELETE',
    });
  }

  async getEmployeeTypes(): Promise<EmployeeType[]> {
    const response = await fetch(`${BASE_URL}/api/EmployeeTypes`);
    return await response.json();
  }
}
