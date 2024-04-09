'use client'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Tool } from '@/types/tool'
import { ToolStatus } from '@/types/toolStatus'
import CategorySelect from '@/components/CategorySelect';
import { ToolService } from '@/services/toolService';

const toolService = new ToolService();

const schema = z.object({
  name: z.string().min(3).max(25),
  barcode: z.string().length(12).regex(/^\d+$/),
  price: z.number().min(0),
  category: z.number(),
  model: z.string(),
  manufacturer: z.string(),
});

const AddToolForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Tool>({
    defaultValues: {
      name: "hammer",
      barcode: "123456789012",
      price: 10,
      model: "model",
      manufacturer: "manufacturer",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Tool> = async (data) => {
    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Create a new tool
      const tool: Tool = {
        ...data,
        status: ToolStatus.AVAILABLE,
        id: Math.floor(Math.random() * 1000),
        entryDate: new Date(),
        orderRequestId: 9,
      }
      // Call the service to create the tool
      await toolService.createTool(tool);
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
    // Log the tools
    console.log(await toolService.getTools());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        label={ errors.name ? errors.name.message : "Name" }
        error={ errors.name ? true : false }
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('barcode')}
        label={ errors.barcode ? errors.barcode.message : "Barcode (12 digits)" }
        error={ errors.barcode ? true : false }
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('price', {
          valueAsNumber: true,
        })}
        type="number"
        label={ errors.price ? errors.price.message : "Price" }
        error={ errors.price ? true : false }
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('model')}
        label={ errors.model ? errors.model.message : "Model" }
        error={ errors.model ? true : false }
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('manufacturer')}
        label={ errors.manufacturer ? errors.manufacturer.message : "Manufacturer" }
        error={ errors.manufacturer ? true : false }
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <CategorySelect formState={{ register, errors }}/>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: '56px', mt: '16px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          { isSubmitting ? <CircularProgress color="secondary" /> : "Add Tool" }
        </Button>
      </Box>
      { errors.root && <Box sx={{ color: 'red', mt: '16px' }}>{errors.root.message}</Box> }
    </form>
  )
}

export default AddToolForm;
