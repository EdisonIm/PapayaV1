import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Login, { PAGE_NAME as LoginPageName } from '../../pages/Login';
import { LoginStackParam } from '../../utils/types/navigation';

const LoginRoot = createNativeStackNavigator<LoginStackParam>();
export const SCREEN_NAME = 'S_LOGIN'
const LoginScreen = () => {
  return (
    <LoginRoot.Navigator>
      <LoginRoot.Group>
        <LoginRoot.Screen
          name={LoginPageName}
          component={Login}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'Pretendard-SemiBold',
              fontSize: 14,
            }
          }}
        />
      </LoginRoot.Group>
    </LoginRoot.Navigator>
  );
}
export default LoginScreen