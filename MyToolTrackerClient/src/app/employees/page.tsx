'use client'

import * as React from 'react';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import RecordTable from '@/components/RecordTable';
import { EmployeeService } from '@/services/employeeService';
import { Employee } from '@/types/employee';

import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';


// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'jmbg', headerName: 'JMBG', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', sortable: false, width: 130 },
  { field: 'employeeType', headerName: 'Type', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// Create an instance of the EmployeeService
const employeeService = new EmployeeService();

// Define an interface for Employee with employeeType
interface EmployeeWithTypeName extends Employee {
  employeeType: string;
}

const EmployeesPage = () => {
  // State to keep track of employees
  const [employees, setEmployees] = React.useState<EmployeeWithTypeName[]>([]);

  const fetchData = async () => {
    try {
      const data = await employeeService.getEmployees();
      const employeeTypes = await employeeService.getEmployeeTypes();

      // Map employee type ids to employee type names
      const employeesWithTypeName: EmployeeWithTypeName[] = data.map(employee => {
        const employeeType = employeeTypes.find(type => type.id === employee.employeeTypeId);
        return {
          ...employee,
          employeeType: employeeType?.name || '',
        };
      });

      setEmployees(employeesWithTypeName);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Employees</h1>
      <Box sx={{ width: '90%' }} >
        <RecordTable
          records={employees}
          columns={columns}
          onDelete={employeeService.deleteEmployee}
          fetchData={fetchData}
          addRecordForm={<AddEmployeeForm />}
          recordType="Employee"
        />
      </Box>
    </main>
  );
}

export default EmployeesPage;
