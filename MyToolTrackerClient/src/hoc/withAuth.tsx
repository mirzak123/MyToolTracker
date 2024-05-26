"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WrapperComponent: React.FC<any> = (props) => {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Redirect to login page if user is not authenticated
      if (!loading && !token) {
        router.push("/login");
      }
    }, [loading, router, token]);

    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
  return WrapperComponent;
};

export default withAuth;
