'use client'

import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Employee } from '@/types/employee';
import { EmployeeService } from '@/services/employeeService';
import EmployeeListToolbar from '@/components/EmployeeListToolbar';
import AddEmployeeDialog from '@/components/AddEmployeeDialog';

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'jmbg', headerName: 'JMBG', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', sortable: false, width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
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

const EmployeeList = () => {
  // State to keep track of employees
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  // State to keep track of the dialog open state
  const [open, setOpen] = React.useState(false);
  // State to keep track of selected rows
  const [selectedIds, setSelectedIds] = React.useState<GridRowSelectionModel>([]);

  const handleDeleteSelected = () => {
    console.log('Delete selected:', selectedIds);
    const filteredEmployees = employees.filter((row: any) => !selectedIds.includes(row.id));
    setEmployees(filteredEmployees);
    setSelectedIds([]);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeService.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <EmployeeListToolbar
        setOpen={setOpen}
        handleDeleteSelected={handleDeleteSelected}
      />
      <DataGrid
        rows={employees}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedIds(newRowSelectionModel);
        }}
        rowSelectionModel={selectedIds}
      />
      <AddEmployeeDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

export default EmployeeList;
