"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  fetchFavourites,
  removeFavourite,
} from "../lib/features/favourites/favouritesSlice";

const FavouriteButton = ({ country }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  const isFavourite = favourites.some(
    (favourite) => favourite.country_name === country?.name?.common
  );

  const toggleFavourite = () => {
    if (!user) return;

    if (isFavourite) {
      setOpenSnackbar(true); // show notification if already favourite
    } else {
      dispatch(addFavourite(country));
    }
  };

  // if no user, return nothing
  if (!user) return null;

  return (
    <>
      <Tooltip
        title={isFavourite ? "Already in favourites" : "Add to favourites"}
      >
        <IconButton
          onClick={toggleFavourite}
          disabled={loading}
          color={isFavourite ? "error" : "primary"}
        >
          {isFavourite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          This country is already in your favourites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavouriteButton;
