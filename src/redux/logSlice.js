import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    AccessToken: "",
    results: [],
    searchArticles: [],
  },

  reducers: {
    login(state, action) {
      state.user = action.payload.value;
    },

    Access(state, action) {
      state.AccessToken = action.payload.value;
    },
    getResults(state, action) {
      state.results = action.payload.value;
    },
    searchArticles(state, action) {
      let results = [...state.results];
      console.log("Results", state.results);
      let searchArticles = [...state.searchArticles];

      let value = action.payload.value;

      for (let i = 0; i < results.length; i++) {
        if (
          results[i].abstract.includes(value) ||
          results[i].lead_paragraph.includes(value)
        ) {
          console.log("I AM HERE");
          searchArticles.push(results[i]);
        } else {
          if (value == "") {
            searchArticles.push(results[i]);
          }
        }
      }
    },
  },
});

export const logActions = logSlice.actions;

export default logSlice;
