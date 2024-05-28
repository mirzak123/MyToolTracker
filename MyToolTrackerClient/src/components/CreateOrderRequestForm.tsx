"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OrderRequestService } from "@/services/orderRequestService";
import { OrderRequest } from "@/types/orderRequest";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Autocomplete,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { Project } from "@/types/project";
import { Tool } from "@/types/tool";
import { EmployeeService } from "@/services/employeeService";
import { ToolService } from "@/services/toolService";
import { ProjectService } from "@/services/projectService";
import dayjs, { Dayjs } from "dayjs";
import FormSuccessSnackbar from "./FormSuccessSnackbar";
import useOpenState from "@/hooks/useOpenState";

const orderRequestService = new OrderRequestService();
const projectService = new ProjectService();
const employeeService = new EmployeeService();
const toolService = new ToolService();

const schema = z
  .object({
    employeeId: z.number(),
    projectId: z.number(),
    toolId: z.number(),
    startDate: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine((val) => val.isValid(), {
        message: "Invalid start date",
      }),
    endDate: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine((val) => val.isValid(), { message: "Invalid end date" }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

const CreateOrderRequestForm = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  // Custom hook for snackbar
  const {
    isOpen: isSnackbarOpen,
    open: openSnackbar,
    close: closeSnackbar,
  } = useOpenState();

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await employeeService.getEmployees();
      const projectsData = await projectService.getProjects();
      const toolsData = await toolService.getTools();

      setEmployees(employeesData);
      setProjects(projectsData);
      setTools(toolsData);
    };

    fetchData();
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const formatDateOnly = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const onSubmit: SubmitHandler<OrderRequest> = async (data) => {
    try {
      data.startDate = new Date(data.startDate);
      data.startDate = formatDateOnly(data.startDate);
      data.endDate = new Date(data.endDate);
      data.endDate = formatDateOnly(data.endDate);
      await orderRequestService.createOrderRequest(data);
      reset();
      openSnackbar();
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="employeeId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={employees}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            value={employees.find((employee) => employee.id === value) || null}
            onChange={(_event, newValue) => {
              onChange(newValue ? newValue.id : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  errors.employeeId ? errors.employeeId.message : "Employee"
                }
                error={errors.employeeId ? true : false}
                variant="outlined"
                margin="normal"
              />
            )}
            fullWidth
          />
        )}
      />
      <Controller
        name="projectId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={projects}
            getOptionLabel={(option) => option.name}
            value={projects.find((project) => project.id === value) || null}
            onChange={(_event, newValue) => {
              onChange(newValue ? newValue.id : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={errors.projectId ? errors.projectId.message : "Project"}
                error={errors.projectId ? true : false}
                variant="outlined"
                margin="normal"
              />
            )}
            fullWidth
          />
        )}
      />
      <Controller
        name="toolId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={tools}
            getOptionLabel={(option) => `${option.name} (${option.barcode})`}
            value={tools.find((tool) => tool.id === value) || null}
            onChange={(_event, newValue) => {
              onChange(newValue ? newValue.id : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={errors.toolId ? errors.toolId.message : "Tool"}
                error={errors.toolId ? true : false}
                variant="outlined"
                margin="normal"
              />
            )}
            fullWidth
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Start Date"
                slotProps={{
                  textField: {
                    variant: "outlined",
                    label: errors.startDate
                      ? errors.startDate.message
                      : "Start Date",
                    error: errors.startDate ? true : false,
                  },
                }}
                {...field}
                value={dayjs(field.value)}
                onChange={(date: any) => field.onChange(date)}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="End Date"
                slotProps={{
                  textField: {
                    variant: "outlined",
                    label: errors.endDate ? errors.endDate.message : "End Date",
                    error: errors.endDate ? true : false,
                  },
                }}
                {...field}
                value={dayjs(field.value)}
                onChange={(date: any) => field.onChange(date)}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: "56px", minWidth: "450px", mt: "16px" }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Typography fontWeight="bold">Create order request</Typography>
          )}
        </Button>
      </Box>
      {errors.root && (
        <Box sx={{ color: "red", mt: "16px" }}>{errors.root.message}</Box>
      )}

      <FormSuccessSnackbar
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
        message="Created successfully!"
      />
    </form>
  );
};

export default CreateOrderRequestForm;
