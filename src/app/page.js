"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "./context/AuthContext"; // Make sure path is correct

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const theme = useTheme();

  // Background for light and dark modes
  const backgroundGradient =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #0d1117, #1c1c1c)"
      : "linear-gradient(135deg, #e0f7fa, #ffffff)";

  const cardBackground = theme.palette.mode === "dark" ? "#1f1f1f" : "#ffffff";
  const cardTextColor = theme.palette.mode === "dark" ? "#fff" : "#333";
  const subtitleColor = theme.palette.mode === "dark" ? "#ccc" : "#555";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        background: backgroundGradient,
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Circles */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(33, 150, 243, 0.1)", // light blue circles
          top: -50,
          left: -50,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(33, 150, 243, 0.07)",
          bottom: -100,
          right: -100,
        }}
      />

      {/* Main Card */}
      <Paper
        elevation={10}
        sx={{
          mt: 4,
          mb: 4,
          p: 6,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          backgroundColor: cardBackground,
          color: cardTextColor,
          textAlign: "center",
          zIndex: 1,
          maxWidth: 500,
          width: "100%",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 10px 25px rgba(0,0,0,0.1)"
              : undefined,
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #ff6b6b, #feca57)"
                : "linear-gradient(90deg, #0288d1, #26c6da)", // blue gradient for light mode
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Explore Countries
        </Typography>

        {/* Subtitle */}
        <Typography variant="h6" sx={{ color: subtitleColor }}>
          Discover countries, capitals, maps, borders, and live weather.
        </Typography>

        {/* Get Started Button */}
        {!user && (
          <Button
            size="large"
            sx={{
              mt: -1,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(90deg, #ff6b6b, #feca57)"
                  : "linear-gradient(90deg, #0288d1, #26c6da)",
              color: "#fff",
              fontWeight: "bold",
              paddingX: 4,
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #feca57, #ff6b6b)"
                    : "linear-gradient(90deg, #26c6da, #0288d1)",
              },
            }}
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        )}
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          py: 3,
          textAlign: "center",
          color: theme.palette.text.secondary,
          borderTop: "1px solid",
          borderColor: theme.palette.divider,
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          &copy; {new Date().getFullYear()} Explore Countries. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
}
