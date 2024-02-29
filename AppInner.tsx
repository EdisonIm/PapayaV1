import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import pages
import MainPage from './src/pages/MainPage';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import Settings from './src/pages/Settings';
import UserProfile from './src/pages/UserProfile/UserProfile';
import UserProfileEditImage from './src/pages/UserProfile/UserProfileEdit/UserProfileEditImage';
import UserProfileEditName from './src/pages/UserProfile/UserProfileEdit/UserProfileEditName';
import UserProfileEditPhoneNumber from './src/pages/UserProfile/UserProfileEdit/UserProfileEditPhoneNumber';
import UserProfileEditAddress from './src/pages/UserProfile/UserProfileEdit/UserProfileEditAddress';
// makers
import MakersLogin from './srcMakers/makersPages/MakersLogin';
import MakersProfile from './srcMakers/makersPages/MakersProfile';
import MakersSignUp from './srcMakers/makersPages/MakersSignUp';

// Define param lists for navigation
export type LoggedInParamList = {
  UserProfile: undefined;
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
  MakersProfile: undefined;
};

export type RootStackParamList = {
  MainPage: undefined;
  Login: undefined;
  SignUp: undefined;
  MakersLogin: undefined;
  MakersSignUp: undefined;
  UserProfileEditImage: undefined;
  UserProfileEditName: undefined;
  UserProfileEditPhoneNumber: undefined;
  UserProfileEditAddress: undefined;
};

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const userState = useSelector((state: RootState) => state.user);
  const makersUserState = useSelector((state: RootState) => state.makersUser);

  const isLoggedIn = !!userState?.email;
  const isMakersLoggedIn = !!makersUserState?.email; //이부분 수정해야됨

  const [socket, disconnect] = useSocket();

  useEffect(() => {
    if (socket && isLoggedIn) {
      socket.emit('login', {});
      socket.on('data', data => {
        console.log(data);
      });
    }
    return () => {
      if (socket) {
        socket.off('data');
        disconnect();
      }
    };
  }, [disconnect, isLoggedIn, socket]);

  if (isLoggedIn || isMakersLoggedIn) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{title: '내 정보'}}
        />
        <Stack.Screen
          name="UserProfileEditImage"
          component={UserProfileEditImage}
          options={{title: 'Edit Image'}}
        />
        <Stack.Screen
          name="UserProfileEditName"
          component={UserProfileEditName}
          options={{title: 'Edit Name'}}
        />
        <Stack.Screen
          name="UserProfileEditPhoneNumber"
          component={UserProfileEditPhoneNumber}
          options={{title: 'Edit Phone Number'}}
        />
        <Stack.Screen
          name="UserProfileEditAddress"
          component={UserProfileEditAddress}
          options={{title: 'Edit Address'}}
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
          options={{title: '설정'}}
        />
        {isMakersLoggedIn && (
          <Tab.Screen
            name="MakersProfile"
            component={MakersProfile}
            options={{title: '메이커스 정보'}}
          />
        )}
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
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
        <Stack.Screen
          name="MakersSignUp"
          component={MakersSignUp}
          options={{title: '메이커스 회원가입'}}
        />
      </Stack.Navigator>
    );
  }
}

export default AppInner;
