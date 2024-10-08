// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme: "light",
// };

// export const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toogleTheme: (state) => {
//       state.theme = state.theme === "dark" ? "light" : "dark";
//     },
//   },
// });
// export const { toogleTheme } = themeSlice.actions;

// export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
