"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Button, Toolbar, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import FavouriteCountriesButton from "@/components/FavouriteCountriesButton.jsx";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar>
          {/* Home Icon */}
          <IconButton color="inherit" onClick={() => router.push("/")}>
            <HomeIcon />
          </IconButton>

          <Button color="inherit" onClick={() => router.push("/countries")}>
            Countries
          </Button>

          <FavouriteCountriesButton />
          <Button color="inherit" onClick={() => router.push("/example")}>
            Example
          </Button>
          <Button color="inherit" onClick={() => router.push("/protected")}>
            Protected
          </Button>

          {user && (
            <>
              <Button color="inherit" onClick={() => router.push("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          )}

          {!user && (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};

export default Navigation;
