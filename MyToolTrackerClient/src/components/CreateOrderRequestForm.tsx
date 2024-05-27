"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OrderRequestService } from "@/services/orderRequestService";
import { OrderRequest } from "@/types/orderRequest";
import { TextField, Box, Button, CircularProgress } from "@mui/material";

const orderRequestService = new OrderRequestService();

const schema = z.object({
  employeeId: z.number(),
  projectId: z.number(),
  toolId: z.number(),
  startDate: z.date(),
  endDate: z.date(),
});

const CreateOrderRequestForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OrderRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<OrderRequest> = async (data) => {
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await orderRequestService.createOrderRequest(data);
      console.log(await orderRequestService.getOrderRequests());
    } catch (error) {
      setError("root", {
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("employeeId", {
          required: "Employee ID is required",
          valueAsNumber: true,
        })}
        label={errors.employeeId ? errors.employeeId.message : "Employee ID"}
        error={errors.employeeId ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register("projectId", {
          required: "Project ID is required",
          valueAsNumber: true,
        })}
        label={errors.projectId ? errors.projectId.message : "Project ID"}
        error={errors.projectId ? true : false}
        margin="normal"
        fullWidth
      />
      <TextField
        {...register("toolId", {
          required: "Tool ID is required",
          valueAsNumber: true,
        })}
        label={errors.toolId ? errors.toolId.message : "Tool ID"}
        error={errors.toolId ? true : false}
        margin="normal"
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: "56px", mt: "16px" }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isSubmitting ? <CircularProgress color="secondary" /> : "Add Tool"}
        </Button>
      </Box>
      {errors.root && (
        <Box sx={{ color: "red", mt: "16px" }}>{errors.root.message}</Box>
      )}
    </form>
  );
};

export default CreateOrderRequestForm;
