import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export type User = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: User;
};

const initialState: AuthState = {
  user: {} as User,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    loggedOut: (state) => {
      state.user = {} as User;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export const selectUser = ({ auth }: RootState) => auth.user;

export default authSlice.reducer;
