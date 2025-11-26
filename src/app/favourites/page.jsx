"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavourites,
  removeFavourite,
} from "../../lib/features/favourites/favouritesSlice";
import { useAuth } from "../context/AuthContext";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  const handleDeleteClick = (e, country) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedCountry(country);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCountry) {
      dispatch(removeFavourite(selectedCountry.name.common));
    }
    setOpenDialog(false);
    setSelectedCountry(null);
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setSelectedCountry(null);
  };

  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">Please login to see your favourites</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        My Favourite Countries
      </Typography>

      {favourites.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No favourites found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map((favourite) => {
            const country = favourite.country_data;
            const countrySlug = country.name.common
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favourite.id}>
                <Card
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "hidden",
                    p: 2,
                  }}
                >
                  {/* Cross Icon at top-right */}
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": { backgroundColor: "rgba(255,0,0,0.9)" },
                      zIndex: 10,
                    }}
                    onClick={(e) => handleDeleteClick(e, country)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  {/* Link area */}
                  <Link
                    href={`/countries/${encodeURIComponent(countrySlug)}`}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 100,
                            height: 60,
                            position: "relative",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            src={country.flags?.svg || country.flags?.png || "/placeholder.png"}
                            alt={country.name?.common}
                          />
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{ mt: 1, textAlign: "center", wordBreak: "break-word" }}
                        >
                          {country.name?.common}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Red warning dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>
          <Typography color="error">Warning</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            Are you sure you want to remove {selectedCountry?.name.common} from your favourites?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FavouritesPage;
