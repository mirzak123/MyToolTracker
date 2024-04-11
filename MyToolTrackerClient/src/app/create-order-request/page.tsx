import Box from '@mui/material/Box';
import CreateOrderRequestForm from '@/components/CreateOrderRequestForm';

const CreateOrderRequestPage = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', 
      alignItems: 'center'}}>
      <h1>Create New Order Request</h1>
      <Box sx={{ display: 'flex', textAlign: 'center', maxWidth: '60%' }}>
        <CreateOrderRequestForm />
      </Box>
    </main>
  );
}

export default CreateOrderRequestPage;

