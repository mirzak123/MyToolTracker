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

// // Dummy data
// // Extend with 50 employees
// const employees: Employee[] = [
//   { id: 1, lastName: 'Karic', firstName: 'Mirza', jmbg: '1234567890123',
//     idCardNumber: '123456789', contactNumber: '123456789', type: 1 },
//   { id: 2, lastName: 'Maksumic', firstName: 'Mirza', jmbg: '1234567890124',
//     idCardNumber: '123456788', contactNumber: '123456788', type: 1 },
//   { id: 3, lastName: 'Husanovic', firstName: 'Armin', jmbg: '1234567890125',
//     idCardNumber: '123456787', contactNumber: '123456787', type: 1 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', jmbg: '1234567890126',
//     idCardNumber: '123456786', contactNumber: '123456786', type: 1 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', jmbg: '1234567890127',
//     idCardNumber: '123456785', contactNumber: '123456785', type: 1 },
//   { id: 6, lastName: 'Melisandre', firstName: '', jmbg: '1234567890128',
//     idCardNumber: '123456784', contactNumber: '123456784', type: 1 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', jmbg: '1234567890129',
//     idCardNumber: '123456783', contactNumber: '123456783', type: 1 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', jmbg: '1234567890130',
//     idCardNumber: '123456782', contactNumber: '123456782', type: 1 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', jmbg: '1234567890131',
//     idCardNumber: '123456781', contactNumber: '123456781', type: 1 },
// ];
//
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(employee: Employee): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  async deleteEmployee(id: number): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  async getEmployeeTypes(): Promise<EmployeeType[]> {
    const response = await fetch(`${BASE_URL}/api/EmployeeTypes`);
    return await response.json();
  }
}
