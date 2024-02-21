import MainPage from './src/pages/MainPage';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import Settings from './src/pages/Settings';
import UserProfile from './src/pages/UserProfile';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import {useEffect} from 'react';
import MakersLogin from './src/makersPages/MakersLogin';
import MakersProfile from './src/makersPages/MakersProfile';

export type LoggedInParamList = {
  UserProfile: undefined;
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
  MakersProfile: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  MakersLogin: undefined;
  MakersSignUp: undefined;
};

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log('isLoggedIn', isLoggedIn);

  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
      // dispatch(orderSlice.actions.addOrder(data)); // 이 부분은 orderSlice를 import하지 않았기 때문에 주석 처리합니다.
    };
    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', callback);
    }
    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return isLoggedIn ? (
    <Tab.Navigator>
      {'UserProfile'}
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{title: '내 정보'}}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{title: '오더 목록'}}
      />
      <Tab.Screen
        name="Delivery"
        component={Delivery}
        options={{title: '내 오더'}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{title: '내 정보'}}
      />
      {'MakersProfile'}
      <Tab.Screen
        name="MakersProfile"
        component={MakersProfile}
        options={{title: '메이커스 정보'}}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="MakersLogin"
        component={MakersLogin}
        options={{title: '메이커스 로그인'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
