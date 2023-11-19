import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  id: "",
  role: "",
  username: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      for (const property in state) {
        state[property] = action.payload[property];
      }
    },
    logout(state) {
      for (const property in state) {
        state[property] = "";
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
