"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";

const Countries = () => {
  const dispatch = useDispatch();

  //First countries comes from store.js file, second countries comes from countriesSlice.js under initialState
  const countries = useSelector((state) => state.countries.countries);
  console.log("Countries:", countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <>
      <div>
        <h1>Countries</h1>
        <ul>
          {countries.map((country) => {
            const currency = Object.values(country.currencies)[0]; // get first currency
            return (
              <li key={country.name.common}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  width={30}
                  style={{ marginRight: "8px" }}
                />
                <strong>{country.name.common}</strong> — Population:{" "}
                {country.population.toLocaleString()} — Currency:{" "}
                {currency?.name} ({currency?.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Countries;
