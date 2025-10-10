import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  loading: false,
};

// Creating state
const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// Provide state
export default favouritesSlice.reducer;
