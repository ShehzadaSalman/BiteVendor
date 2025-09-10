import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
