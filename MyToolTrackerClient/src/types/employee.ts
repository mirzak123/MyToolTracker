import { EmployeeType } from './employeeType';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  jmbg: string;
  idCardNumber: string;
  contactNumber: string;
  type: EmployeeType;   // will be changed to fetch from the server
}
