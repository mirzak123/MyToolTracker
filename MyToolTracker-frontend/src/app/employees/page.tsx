import Box from '@mui/material/Box';
import EmployeeList from '@/components/EmployeeList';

const EmployeesPage = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Employees</h1>
      <Box sx={{ width: '90%' }} >
        <EmployeeList />
      </Box>
    </main>
  );
}

export default EmployeesPage;
