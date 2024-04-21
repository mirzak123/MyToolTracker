'use client'

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Tool } from '@/types/tool'
import { ToolStatus } from '@/types/toolStatus'
import { ToolService } from '@/services/toolService';
import CategorySelect from '@/components/CategorySelect';
import { FormProps } from '@/types/FormProps';

import {
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const toolService = new ToolService();

const schema = z.object({
  name: z.string().min(3).max(100),
  barcode: z.string().length(12).regex(/^\d+$/),
  price: z.number().min(0),
  categoryId: z.number(),
  model: z.string(),
  manufacturer: z.string(),
  toolStatusId: z.number().min(1),
});

const AddToolForm: React.FC<FormProps> = ({
  fetchData,
}) => {
  const [toolStatuses, setToolStatuses] = useState<ToolStatus[]>([]);
  const [selectedToolStatus, setSelectedToolStatus] = useState<number | null>(null);

  useEffect(() => {
    toolService.getToolStatuses().then((data) => {
      setToolStatuses(data);
    });
  }, []);

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

  const onSubmit: SubmitHandler<Tool> = async (tool: Tool) => {
    try {
      await toolService.createTool(tool);
      if (fetchData !== undefined) {
        fetchData();
      }
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
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
      <FormControl fullWidth margin="normal">
        <InputLabel id="type">Tool Status</InputLabel>
        <Select
          {...register('toolStatusId')}
          value={selectedToolStatus || ''}
          onChange={(e) => setSelectedToolStatus(e.target.value as number)}
          label="Tool Status"
          labelId="type"
          error={errors.toolStatusId ? true : false}
          fullWidth
        >
          { toolStatuses.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
