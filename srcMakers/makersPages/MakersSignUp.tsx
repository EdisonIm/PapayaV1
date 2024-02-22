import React, {useCallback, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../../srcMakers/makersComponents/DissmisKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';
import {Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native';

type MakersSignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MakersSignUp'
>;

interface ErrorResponse {
  message: string;
}

function MakersSignUp({navigation}: MakersSignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState('');

  // References for text inputs
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const companyNameRef = useRef<TextInput | null>(null);
  const phoneRef = useRef<TextInput | null>(null);
  const companyRegistrationNumberRef = useRef<TextInput | null>(null);

  // Handlers
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onChangeCompanyName = useCallback((text: string) => {
    setCompanyName(text.trim());
  }, []);

  const onChangePhone = useCallback((text: string) => {
    setPhone(text.trim());
  }, []);

  const onChangeCompanyRegistrationNumber = useCallback((text: string) => {
    setCompanyRegistrationNumber(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    // Add validation for company name, phone, and company registration number

    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/makers/new`,
        {
          email,
          password,
          name: companyName,
          phone,
          companyRegistrationNumber,
        },
      );

      // Handle response
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('MakersLogin');
    } catch (error) {
      const errorResponse = (error as AxiosError<ErrorResponse>).response;
      console.error(errorResponse);
      if (errorResponse && errorResponse.data) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    navigation,
    email,
    password,
    companyName,
    phone,
    companyRegistrationNumber,
  ]);

  const canGoNext =
    email && password && companyName && phone && companyRegistrationNumber;

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => companyNameRef.current?.focus()}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>회사명</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeCompanyName}
          placeholder="회사명을 입력해주세요"
          placeholderTextColor="#666"
          value={companyName}
          ref={companyNameRef}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePhone}
          placeholder="전화번호를 입력해주세요"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phone}
          ref={phoneRef}
          returnKeyType="next"
          onSubmitEditing={() => companyRegistrationNumberRef.current?.focus()}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>사업자 등록번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeCompanyRegistrationNumber}
          placeholder="사업자 등록번호를 입력해주세요"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          value={companyRegistrationNumber}
          ref={companyRegistrationNumberRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </View>
      <Pressable
        style={
          canGoNext
            ? [styles.button, styles.buttonActive] // Apply the active style if canGoNext is true
            : styles.button // Otherwise, apply only the base button style
        }
        disabled={!canGoNext || loading} // Disable the button if canGoNext is false or if loading is true
        onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>기업 회원 가입</Text>
        )}
      </Pressable>
    </DismissKeyboardView>
  );
}

// Rest of the styles...
const styles = StyleSheet.create({
  // Existing styles...
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'gray', // 버튼 기본 배경색
    marginTop: 20,
  },
  buttonActive: {
    // 활성화된 버튼의 배경색
    backgroundColor: 'blue',
  },
  buttonText: {
    // 버튼 텍스트 스타일
    fontSize: 16,
    color: 'white',
  },
  // ... 나머지 스타일들
});

export default MakersSignUp;
