'use client'

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Tool } from '@/types/tool'
import { ToolStatus } from '@/types/toolStatus'
import { Category } from '@/types/category'
import { ToolService } from '@/services/toolService';
import { CategoryService } from "@/services/categoryService";
import CustomSelect from '@/components/CustomSelect';
import { FormProps } from '@/types/FormProps';
import useOpenState from '@/hooks/useOpenState';

import {
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import FormSuccessSnackbar from './FormSuccessSnackbar';

const toolService = new ToolService();
const categoryService = new CategoryService();

const schema = z.object({
  name: z.string().min(3).max(100),
  barcode: z.string().length(12).regex(/^\d+$/),
  price: z.number().min(0),
  categoryId: z.number().min(1),
  model: z.string(),
  manufacturer: z.string(),
  toolStatusId: z.number().min(1),
});

const AddToolForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  const [toolStatuses, setToolStatuses] = useState<ToolStatus[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [selectedToolStatus, setSelectedToolStatus] = useState<number | null>(null);
  
  // Custom hook for snackbar
  const { isOpen: isSnackbarOpen, open: openSnackbar, close: closeSnackbar } = useOpenState();

  useEffect(() => {
    toolService.getToolStatuses().then((data: ToolStatus[]) => {
      setToolStatuses(data);
    });

    categoryService.getCategories().then((data: Category[]) => {
      setCategories(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Tool>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Tool> = async (tool: Tool) => {
    try {
      if (isUpdate) {
        tool.id = defaultValues ? defaultValues?.id : 0;
        await toolService.updateTool(tool);
      } else {
        await toolService.createTool(tool);
      }
      if (fetchData !== undefined) {
        fetchData();
      }
      reset();
      openSnackbar();
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
      <CustomSelect
        formState={{ register, errors }}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        fieldName="categoryId"
        label="Category"
      />
      { toolStatuses.length > 0 &&
      <CustomSelect
        formState={{ register, errors }}
        options={toolStatuses.map((status) => ({
          value: status.id,
          label: status.name,
        }))}
        fieldName="toolStatusId"
        label="Tool Status"
      />
      }
      {/* <FormControl fullWidth margin="normal">
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
      */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: '56px', mt: '16px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          { isSubmitting ? <CircularProgress color="secondary" /> :
            isUpdate ? "Update Tool" : "Add Tool" }
        </Button>
      </Box>
      { errors.root && <Box sx={{ color: 'red', mt: '16px' }}>{errors.root.message}</Box> }

      <FormSuccessSnackbar
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
        message={isUpdate ?
        "Tool updated successfully!" :
        "Tool added successfully!"}
      />
    </form>
  )
}

export default AddToolForm;
