import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    singInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    singInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    UserStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    UserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    UserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    DeleteUserStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    DeleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    DeleteUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  signInStart,
  singInFail,
  singInSuccess,
  UserSuccess,
  UserFail,
  UserStart,
  DeleteUserFail,
  DeleteUserStart,
  DeleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
