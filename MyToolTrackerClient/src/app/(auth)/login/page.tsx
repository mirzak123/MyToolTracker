"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const schema = z.object({
  // TODO: Check username requirements for AspNet.Identity
  username: z.string().min(3).max(100),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/\W/),
});

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; password: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
  }> = async ({ username, password }) => {
    try {
      await login(username, password);
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
      <Box sx={{ textAlign: "center" }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("username")}
            label={errors.username ? errors.username.message : "Username"}
            error={errors.username ? true : false}
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
                <Typography fontWeight="bold">Login</Typography>
              )}
            </Button>
          </Box>
          {errors.root && (
            <Box sx={{ color: "red", mt: "16px" }}>{errors.root.message}</Box>
          )}
        </form>
        <Box sx={{ mt: "16px" }}>
          <Typography>
            Don&apos;t have an account?{" "}
            <Button variant="text" href="/register">
              Register here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
