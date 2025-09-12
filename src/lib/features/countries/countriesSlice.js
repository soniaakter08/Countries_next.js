import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
};

const api =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies";

export const fetchCountries = createAsyncThunk(
  "countries/countries",
  async () => {
    const response = await axios.get(api);
    return response.data;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

export default countriesSlice.reducer;
