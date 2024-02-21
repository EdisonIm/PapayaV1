import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MakersUserState {
  email: string;
  accessToken: string;
  refreshToken: string;
  companyName: string;
}

const initialState: MakersUserState = {
  email: '',
  accessToken: '',
  refreshToken: '',
  companyName: '',
};

const makersUserSlice = createSlice({
  name: 'makersUser',
  initialState,
  reducers: {
    setMakersUser(state, action: PayloadAction<MakersUserState>) {
      const {email, accessToken, refreshToken, companyName} = action.payload;
      state.email = email;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.companyName = companyName;
    },
    setMakersAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setMakersRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setCompanyName(state, action: PayloadAction<string>) {
      state.companyName = action.payload;
    },
    // Add other reducers as necessary for your makers' user functionality
  },
  extraReducers: () => {
    // Handle other actions, such as asynchronous thunk actions, if necessary
  },
});

// Export the actions
export const {
  setMakersUser,
  setMakersAccessToken,
  setMakersRefreshToken,
  setCompanyName,
} = makersUserSlice.actions;

// Export the reducer
export default makersUserSlice.reducer;
