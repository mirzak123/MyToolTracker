'use client'

import Box from '@mui/material/Box';
import AddEmployeeForm from '@/components/AddEmployeeForm';

const AddEmployeePage = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', 
      alignItems: 'center'}}>
      <h1>Add Employee</h1>
      <Box sx={{ display: 'flex', textAlign: 'center', maxWidth: '60%' }}>
        <AddEmployeeForm />
      </Box>
    </main>
  );
}

export default AddEmployeePage;
