import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  userEmail: localStorage.getItem("userEmail"),
  isPremium: localStorage.getItem("isPremium"),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.tokenId;
      state.userEmail = action.payload.email;
      localStorage.setItem("token", action.payload.tokenId);
      localStorage.setItem("userEmail", action.payload.email);
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      state.isPremium = false;
      localStorage.removeItem("isPremium");
      localStorage.removeItem("isDark");
    },
    setIsPremium(state) {
      state.isPremium = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
