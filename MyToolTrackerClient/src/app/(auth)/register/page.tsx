"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    // TODO: Check username requirements for AspNet.Identity
    username: z.string().min(3).max(100),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d/)
      .regex(/\W/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<{
    username: string;
    email: string;
    password: string;
  }> = async (userData) => {
    try {
      await registerUser(userData);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Register</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            maxWidth: "60%",
            width: "700px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username")}
              label={errors.username ? errors.username.message : "Username"}
              error={errors.username ? true : false}
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("email")}
              label={errors.email ? errors.email.message : "Email"}
              error={errors.email ? true : false}
              margin="normal"
              fullWidth
            />
            <TextField
              {...register("password")}
              label={errors.password ? errors.password.message : "Password"}
              error={errors.password ? true : false}
              margin="normal"
              fullWidth
              type="password"
            />
            <TextField
              {...register("confirmPassword")}
              label={
                errors.confirmPassword
                  ? errors.confirmPassword.message
                  : "Confirm Password"
              }
              error={errors.confirmPassword ? true : false}
              margin="normal"
              fullWidth
              type="password"
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
                {isSubmitting ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Typography fontWeight="bold">Register</Typography>
                )}
              </Button>
            </Box>
            {errors.root && (
              <Box sx={{ color: "red", mt: "16px" }}>{errors.root.message}</Box>
            )}
          </form>
          <Box sx={{ mt: "16px" }}>
            <Typography>
              Already have an account?{" "}
              <Button variant="text" href="/login">
                Login
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
