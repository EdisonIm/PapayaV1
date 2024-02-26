import {combineReducers} from 'redux';

// 아래와 같이 기본 export된 리듀서를 직접 import합니다.
import userReducer from '../slices/user';
import orderReducer from '../slices/order';
import makersUserReducer from '../slices/makersUser';

// combineReducers에는 바로 리듀서 함수를 전달합니다.
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  makersUser: makersUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
