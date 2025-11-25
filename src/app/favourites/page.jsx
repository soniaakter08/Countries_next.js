"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  const handleDelete = (countryName) => {
    dispatch(removeFavourite(countryName));
  };

  if (authLoading || loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <div>Please login to see your favourites</div>;
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
        <Grid container spacing={2}>
          {favourites.map((favourite) => {
            const country = favourite.country_data;
            const countrySlug = country.name.common
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favourite.id}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Link
                    href={`/countries/${encodeURIComponent(countrySlug)}`}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                      >
                        <Image
                          width={100}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                          src={
                            country.flags?.svg ||
                            country.flags?.png ||
                            "/placeholder.png"
                          }
                          alt={country.name?.common}
                        />
                        <Typography variant="h6" sx={{ mt: 1, textAlign: "center" }}>
                          {country.name?.common}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>

                  {/* Delete Button */}
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => handleDelete(country.name.common)}
                  >
                    Delete
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default FavouritesPage;
