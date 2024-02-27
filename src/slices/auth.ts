import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true, // 초기 로그인 상태
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
    },
    // 필요한 경우 로그인 액션 추가
    login: state => {
      state.isLoggedIn = true;
    },
  },
});

export const {logout, login} = authSlice.actions;

export default authSlice;
