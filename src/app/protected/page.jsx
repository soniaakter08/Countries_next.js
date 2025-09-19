"use client"; // Required because useAuth uses hooks

import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import AuthRedirect from "../login/AuthRedirect";

const Protected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <AuthRedirect />;
  }

  return <Typography variant="h1">Protected</Typography>;
};

export default Protected;
