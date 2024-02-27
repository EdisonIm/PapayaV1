import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  email: string;
  accessToken: string;
}

const initialState: UserState = {
  email: '',
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    // logout 액션 추가
    logout(state) {
      // 모든 사용자 정보를 초기 상태로 리셋합니다.
      state.email = '';
      state.accessToken = '';
    },
  },
  extraReducers: () => {},
});

// 액션 생성자를 내보냅니다.
export const {setUser, setAccessToken, logout} = userSlice.actions;

export default userSlice;
