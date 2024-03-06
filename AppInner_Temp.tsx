//import 시도하였으나 오류 발생 version
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import pages
import MainPage from './src/pages/MainPage';
import Login from './src/pages/Login/Login';
import SignUp from './src/pages/SignUp/SignUp';
//import Orders from './src/pages/Orders';
//import Delivery from './src/pages/Delivery';
//import Settings from './src/pages/Settings';
import UserProfile from './src/pages/UserProfile/UserProfile';
import NameUploader from './src/pages/UserProfile/components/NameUploader';
import PhoneNumberUploader from './src/pages/UserProfile/components/PhoneNumberUploader';
import AddressUploader from './src/pages/UserProfile/components/AddressUploader';
import ImageUploader from './src/pages/UserProfile/components/ImageUploader';
import MakersLogin from './srcMakers/makersPages/MakersLogin';
import MakersProfile from './srcMakers/makersPages/MakersProfile';
import MakersSignUp from './srcMakers/makersPages/MakersSignUp';
// Import f-v2
import MainTabBar from './src/layouts/MainTabBar';

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
  NameUploader: undefined;
  PhoneNumberUploader: undefined;
  AddressUploader: undefined;
  ImageUploader: {
    userEmail: string;
    onImageUploaded?: (url: string) => void; // 선택적으로 onImageUploaded 함수 포함
  };
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
      <Tab.Navigator tabBar={(props) => <MainTabBar {...props} />}>
        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        {/* 다른 탭 스크린들을 여기에 추가하세요. */}
      </Tab.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen
          name="MakersLogin"
          component={MakersLogin}
          options={{ title: '메이커스 로그인' }}
        />
        <Stack.Screen
          name="MakersSignUp"
          component={MakersSignUp}
          options={{ title: '메이커스 회원가입' }}
        />
        {/* 필요한 경우 추가 Stack.Screen 컴포넌트를 여기에 추가하세요. */}
      </Stack.Navigator>
    );
  }
}

export default AppInner;
