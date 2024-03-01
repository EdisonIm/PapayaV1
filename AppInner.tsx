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
      <Tab.Navigator>
        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NameUploader"
          component={NameUploader}
          options={{title: 'Edit Name'}}
        />
        <Stack.Screen
          name="PhoneNumberUploader"
          component={PhoneNumberUploader}
          options={{title: 'Edit Phone Number'}}
        />
        <Stack.Screen
          name="AddressUploader"
          component={AddressUploader}
          options={{title: 'Edit Address'}}
        />
        <Stack.Screen name="ImageUploader" options={{title: 'ImageUploader'}}>
          {props => (
            <ImageUploader
              userEmail={''}
              {...props}
              onImageUploaded={url => console.log(url)}
            />
          )}
        </Stack.Screen>
        {/*<Tab.Screen
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
    />*/}
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
