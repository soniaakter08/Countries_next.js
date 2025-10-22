"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect, useState } from "react";
import {
  CardContent,
  Grid,
  Typography,
  Card,
  CardActionArea,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const Countries = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <TextField
          label="Search Country"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => console.log("Search clicked!")}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {filteredCountries.map((country) => (
          <Card
            key={country.name.common}
            sx={{ width: "300px", height: "250px" }}
          >
            <CardActionArea
              onClick={() => handleCountryClick(country.name.common)}
            >
              <CardContent>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  width={100}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
                <Typography variant="h5">{country.name.common}</Typography>
                <Typography variant="h6">
                  {country.population.toLocaleString()}
                </Typography>
                <Typography variant="h6">{getCurrencies(country)}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Countries;
