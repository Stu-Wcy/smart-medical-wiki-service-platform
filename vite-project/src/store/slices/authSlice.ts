import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { UserInfoDTO } from '@/types/auth';
import { getToken, setToken as setAuthToken, removeToken, getStoredUserInfo, setStoredUserInfo, removeStoredUserInfo } from '@/utils/auth';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  userInfo: UserInfoDTO | null;
}

const initialState: AuthState = {
  token: getToken(),
  isLoggedIn: !!getToken(),
  userInfo: getStoredUserInfo(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      setAuthToken(action.payload);
    },
    setUserInfo: (state, action: PayloadAction<UserInfoDTO>) => {
      state.userInfo = action.payload;
      setStoredUserInfo(action.payload);
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserInfoDTO>>) => {
      if (state.userInfo) {
        const updatedUserInfo = { ...state.userInfo, ...action.payload };
        state.userInfo = updatedUserInfo;
        setStoredUserInfo(updatedUserInfo);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userInfo = null;
      removeToken();
      removeStoredUserInfo();
    },
  },
});

export const { setToken, setUserInfo, updateUserInfo, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer; 
