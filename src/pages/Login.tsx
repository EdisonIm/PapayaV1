import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native'; // 변경된 부분: useNavigation 훅 사용
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';

interface ErrorResponse {
  message: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const handleLogin = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/members/login`,
        {email, password},
      );

      if (response.data && response.data.accessToken) {
        Alert.alert('알림', '로그인 되었습니다.');
        dispatch(
          userSlice.actions.setUser({
            email: response.data.email,
            accessToken: response.data.accessToken,
          }),
        );
        // 성공 후 로직 (예: 홈 화면으로 이동) 추가 가능
      } else {
        console.error('Unexpected response structure:', response.data);
        Alert.alert('알림', '응답 구조가 예상과 다릅니다.');
      }
    } catch (error) {
      const errorResponse = (error as AxiosError<ErrorResponse>).response;
      if (errorResponse && errorResponse.data && errorResponse.data.message) {
        Alert.alert('알림', errorResponse.data.message);
      } else {
        Alert.alert('알림', '로그인에 실패하였습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, email, password, dispatch]);

  const navigateToSignup = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Login</Text>
      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />
      <Pressable
        style={[styles.button, loading && {backgroundColor: 'gray'}]}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>로그인</Text>
        )}
      </Pressable>
      <Pressable style={styles.link} onPress={navigateToSignup}>
        <Text style={styles.linkText}>계정이 없으신가요? 회원가입하기!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
  },
});

export default LoginScreen;
