"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import FavouriteCountriesButton from "@/components/FavouriteCountriesButton.jsx";

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <div>
      <AppBar position="static" color="gradient" sx={{ mb: 3 }}>
        <Toolbar>
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
            <div>
              
              <Button color="inherit" onClick={() => router.push("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
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
