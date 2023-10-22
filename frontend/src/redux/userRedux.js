import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    registerSuccess: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.registerSuccess = true;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const login = async ( dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3500/auth/login", user)
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3500/auth/register", user);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;