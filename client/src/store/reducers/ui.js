import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Loading state
  isLoading: false,

  // Alert state
  alert: false,
  alertMessage: "",
  alertIsError: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAlert(state, action) {
      const { show, message = "", isError = false } = action.payload;
      state.alert = show;
      state.alertMessage = message;
      state.alertIsError = isError;
    },
  },
});

export const { setIsLoading, setAlert } = uiSlice.actions;

export default uiSlice.reducer;
