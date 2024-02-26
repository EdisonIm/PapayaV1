import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// 사용자 상태의 타입을 정의합니다.
interface UserState {
  email: string;
  accessToken: string;
}

// 사용자 상태의 초기 상태를 정의하고 타입을 명시합니다.
const initialState: UserState = {
  email: '',
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로그아웃 액션에 대한 리듀서를 정의합니다.
    // 이 리듀서는 상태를 초기화합니다.
    logout: state => {
      // 여기서 상태를 직접 변경하고 있습니다. 리덕스 툴킷은 이를 불변성 유지를 위한
      // 작업으로 내부적으로 처리합니다.
      state.email = '';
      state.accessToken = '';
    },
    // 로그인 액션에 대한 리듀서를 추가합니다.
    // 이 리듀서는 이메일과 액세스 토큰을 상태에 설정합니다.
    login: (state, action: PayloadAction<UserState>) => {
      const {email, accessToken} = action.payload;
      state.email = email;
      state.accessToken = accessToken;
    },
    // 필요한 다른 액션 리듀서들을 여기에 추가할 수 있습니다.
  },
});

// 액션 생성자를 내보냅니다.
export const {logout, login} = userSlice.actions;

// 리듀서를 내보냅니다.
export default userSlice.reducer;
