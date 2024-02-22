import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  accessToken: '',
  refreshToken: '',
  money: 0,
  companyName: '',
  revenue: 0,
};
const makersUserSlice = createSlice({
  name: 'makersUser',
  initialState,
  reducers: {
    setMakersUser(state, action) {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setMoney(state, action) {
      state.money = action.payload;
    },
  },
  extraReducers: () => {},
});

export default makersUserSlice;
