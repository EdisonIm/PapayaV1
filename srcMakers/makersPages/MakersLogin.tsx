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
import DismissKeyboardView from '../makersComponents/DissmisKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../../src/store/index';
import makersUserSlice from '../../src/slices/makersUser';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type MakersLoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MakersLogin'
>;

interface ErrorResponse {
  message: string;
}

function MakersLogin({navigation}: MakersLoginScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/makers/login`,
        {email, password},
      );

      if (response.data && response.data.data) {
        console.log(response.data);
        Alert.alert('알림', '메이커스 로그인 되었습니다.');
        dispatch(
          makersUserSlice.actions.setMakersUser({
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } else {
        Alert.alert('알림', '로그인에 실패하였습니다.');
      }
    } catch (error) {
      const errorResponse = (error as AxiosError<ErrorResponse>).response;
      if (errorResponse) {
        Alert.alert(
          '알림',
          errorResponse.data.message || '로그인에 실패하였습니다.',
        );
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, email, password]);

  const canGoNext = email && password;

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('MakersSignUp');
  }, [navigation]);

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>메이커스 이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="메이커스 이메일을 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          onChangeText={onChangePassword}
          value={password}
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>메이커스 로그인</Text>
          )}
        </Pressable>
        <Pressable
          style={[styles.loginButton, {marginTop: 10}]}
          onPress={navigateToSignUp}>
          <Text style={styles.loginButtonText}>메이커스 회원 가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#4e73df', // Example color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: '#2e59d9', // Darker example color
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MakersLogin;
