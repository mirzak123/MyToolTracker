import { useForm, SubmitHandler, } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeService } from "@/services/employeeService";
import { FormProps } from "@/types/FormProps";
import FormSuccessSnackbar from "@/components/FormSuccessSnackbar";
import CustomSelect from "@/components/CustomSelect";
import useOpenState from "@/hooks/useOpenState";
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

const employeeService = new EmployeeService();

const schema = z.object({
  firstName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
  idCardNumber: z.string().length(10).regex(/^[0-9A-Z]+$/, { message: "Only number and uppercase letters!"}),
  jmbg: z.string().length(13).regex(/^\d+$/),
  contactNumber: z.string().min(9).max(10).regex(/^\d+$/),
  employeeTypeId: z.number().min(1),
});

const AddEmployeeForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<number | null>(null);
  // Custom hook for snackbar
  const { isOpen: isSnackbarOpen, open: openSnackbar, close: closeSnackbar } = useOpenState();

  useEffect(() => {
    employeeService.getEmployeeTypes().then((data) => {
      setEmployeeTypes(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Employee>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Employee> = async (employee: Employee) => {
    try {
      if (isUpdate) {
        // Safe to assume defaultValues is not undefined if isUpdate is true
        employee.id = defaultValues ? defaultValues.id : 0;
        await employeeService.updateEmployee(employee);
      } else {
        await employeeService.createEmployee(employee);
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
        {...register('firstName')}
        label={ errors.firstName ? errors.firstName.message : "First Name" }
        error={errors.firstName ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('lastName')}
        label={ errors.lastName ? errors.lastName.message : "Last Name" }
        error={errors.lastName ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('idCardNumber')}
        label={ errors.idCardNumber ? errors.idCardNumber.message : "ID Card Number" }
        error={errors.idCardNumber ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('jmbg')}
        label={ errors.jmbg ? errors.jmbg.message : "JMBG" }
        error={errors.jmbg ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register('contactNumber')}
        label={ errors.contactNumber ? errors.contactNumber.message : "Contact Number" }
        error={errors.contactNumber ? true : false}
        margin="normal"
        fullWidth
      />
      <CustomSelect
        formState={{ register, errors }}
        options={employeeTypes.map((type) => ({ value: type.id, label: type.name }))}
        fieldName='employeeTypeId'
        label='Employee Type'
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: '56px', mt: '16px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          { isSubmitting ? <CircularProgress color="secondary" /> :
            isUpdate ? "Update Employee" : "Add Employee" }
        </Button>
      </Box>
      { errors.root && <Box sx={{ color: 'red', mt: '16px' }}>{errors.root.message}</Box> }

      <FormSuccessSnackbar
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
        message={isUpdate ?
        "Employee updated successfully!" :
         "Employee added successfully!"}
      />
    </form>
  )
}

export default AddEmployeeForm;
