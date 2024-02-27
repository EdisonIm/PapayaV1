import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import orderSlice from '../slices/order';
import makersUserSlice from '../slices/makersUser';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
  makersUser: makersUserSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
