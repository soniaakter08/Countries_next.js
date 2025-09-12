"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import "./page.css";

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
      <div className="countries-page">
        <h1 className="page-title">Countries</h1>
        <ul className="country-list">
          {countries.map((country) => (
            <li key={country.name.common} className="country-card">
              <img
                src={country.flags.png}
                alt={country.flags.alt || country.name.common}
                className="country-flag"
              />
              <h2 className="country-name">{country.name.common}</h2>
              <p className="country-pop">
                Population:{" "}
                <span className="pop-number">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p className="country-currency">
                Currency:{" "}
                <span>
                  {
                    Object.values(country.currencies)[0]
                      ?.name /* e.g. "Jamaican dollar" */
                  }{" "}
                  ({Object.values(country.currencies)[0]?.symbol /* e.g. "$" */}
                  )
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Countries;
