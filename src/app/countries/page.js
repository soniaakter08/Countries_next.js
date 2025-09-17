"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import { CardContent, Grid, Typography, Card } from "@mui/material";

const Countries = () => {
  const dispatch = useDispatch();

  //First countries comes from store.js file, second countries comes from countriesSlice.js under initialState
  const countries = useSelector((state) => state.countries.countries);
  console.log("Countries:", countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const getCurrencies = (country) => {
    if (!country.currencies) return NaN;
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(",");
  };

  return (
    <>
      <h1>Countries</h1>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Card key={country.name.common}>
            <CardContent>
              <img src={country.flags.svg} alt="flag" width={100} height={50} />
              <Typography variant="h5">{country.name.common}</Typography>
              <Typography variant="h6"> {country.population} </Typography>
              <Typography variant="h6">{getCurrencies(country)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Countries;
