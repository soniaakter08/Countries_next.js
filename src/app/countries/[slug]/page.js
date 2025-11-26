"use client";

import { useAuth } from "@/app/context/AuthContext";
import FavouriteButton from "@/components/FavouriteButton";
import {
  clearSelectedCountry,
  setSelectedCountry,
  fetchCountries,
} from "@/lib/features/countries/countriesSlice";
import { fetchFavourites } from "@/lib/features/favourites/favouritesSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CapitalMap from "@/components/CapitalMap";

const CountryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { selectedCountry, loading, error, countries } = useSelector(
    (state) => state.countries
  );

  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const fetchWeatherData = async (capital) => {
    if (!capital) return;
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPI;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capital
        )}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("Weather data not available");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherError(err.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch countries and favourites
  useEffect(() => {
    if (countries.length === 0) dispatch(fetchCountries());
    dispatch(fetchFavourites());
  }, [countries.length, dispatch]);

  // Fetch weather for selected country
  useEffect(() => {
    if (selectedCountry?.capital?.[0]) {
      fetchWeatherData(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  // Select country based on slug
  useEffect(() => {
    if (slug && countries.length > 0) {
      const name = decodeURIComponent(slug.replace(/-/g, " "));
      const country = countries.find(
        (c) =>
          c.name.common.toLowerCase() === name.toLowerCase() ||
          c.name.official.toLowerCase() === name.toLowerCase()
      );
      if (country) dispatch(setSelectedCountry(country));
      else dispatch(clearSelectedCountry());
    }
    return () => dispatch(clearSelectedCountry());
  }, [slug, countries, dispatch]);

  const handleBack = () => router.push("/countries");

  const getLanguages = (country) =>
    country.languages ? Object.values(country.languages).join(", ") : "N/A";

  const formatPopulation = (pop) => new Intl.NumberFormat().format(pop);

  const getBorderCountries = (borderCodes) => {
    if (!borderCodes || borderCodes.length === 0) return ["None"];
    return borderCodes.map((code) => {
      const country = countries.find((c) => c.cca3 === code);
      return country ? country.name.common : code;
    });
  };

  if (loading || countries.length === 0)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6">Loading countries data...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        gap={2}
      >
        <Typography variant="h6" color="error">
          Error loading country: {error}
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
      </Box>
    );

  if (!selectedCountry)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        gap={2}
      >
        <Typography variant="h6">Country not found</Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
      </Box>
    );

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Top Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
        {user && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/favourites")}
            startIcon={<FavoriteIcon />}
          >
            My Favourite Countries
          </Button>
        )}
      </Box>

      {/* Favourite Button */}
      {user && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <FavouriteButton country={selectedCountry} />
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Flag & Details */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={3}
                >
                  <Image
                    width={200}
                    height={120}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    src={
                      selectedCountry.flags?.svg || selectedCountry.flags?.png
                    }
                    alt={`Flag of ${selectedCountry.name?.common}`}
                    priority
                  />
                  <Typography variant="h5" textAlign="center">
                    {selectedCountry.name?.common}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", width: 200 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Country Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography>
                    <strong>Population:</strong>{" "}
                    {formatPopulation(selectedCountry.population)}
                  </Typography>
                  <Typography>
                    <strong>Capital:</strong>{" "}
                    {selectedCountry.capital?.join(", ") || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Languages:</strong>
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {getLanguages(selectedCountry)
                      .split(", ")
                      .map((lang, i) => (
                        <Chip
                          key={i}
                          label={lang}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Weather */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", width: 200 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weather in {selectedCountry.capital?.[0]}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {weatherLoading && <Typography>Loading weather...</Typography>}
                {weatherError && (
                  <Typography color="error">{weatherError}</Typography>
                )}
                {weatherData && !weatherLoading && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Image
                        width={60}
                        height={60}
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                      />
                      <Box>
                        <Typography variant="h5">
                          {Math.round(weatherData.main.temp)}°C
                        </Typography>
                        <Typography variant="body2">
                          {weatherData.weather[0].main}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography>
                      Humidity: {weatherData.main.humidity}%
                    </Typography>
                    <Typography>Wind: {weatherData.wind.speed} m/s</Typography>
                    <Typography>
                      Feels like: {Math.round(weatherData.main.feels_like)}°C
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Border Countries */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Border Countries
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {getBorderCountries(selectedCountry.borders).map(
                    (border, i) => (
                      <Chip
                        key={i}
                        label={border}
                        variant="outlined"
                        size="small"
                      />
                    )
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Capital Map */}
        {selectedCountry?.capitalInfo?.latlng && (
          <Box sx={{ mt: 4 }}>
            <CapitalMap
              capital={selectedCountry.capital[0]}
              latlng={selectedCountry.capitalInfo.latlng}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CountryPage;
