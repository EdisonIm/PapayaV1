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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DissmisKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';

type MakersLoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MakersLogin'
>;

interface ErrorResponse {
  message: string;
}

function MakersLogin({navigation}: MakersLoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add company name state if needed
  const [companyName, setCompanyName] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  // Add company name ref if needed
  const companyNameRef = useRef<TextInput | null>(null);

  // Handlers
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  // Add onChangeCompanyName if needed
  const onChangeCompanyName = useCallback((text: string) => {
    setCompanyName(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    // Add validation for company name if needed

    try {
      setLoading(true);
      // Update the API endpoint to the makers' specific login route
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/makers/login`,
        {
          email,
          password,
          // Add company name to the request if needed
          companyName,
        },
      );

      // Handle response
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      // Update navigation if necessary, e.g., to a makers' dashboard
      navigation.navigate('MakersDashboard');
    } catch (error) {
      const errorResponse = (error as AxiosError<ErrorResponse>).response;
      console.error(errorResponse);
      if (errorResponse && errorResponse.data) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, navigation, email, password, companyName]);

  // Add canGoNext logic if company name is needed
  const canGoNext = email && password && companyName;

  return (
    <DismissKeyboardView>
      {/* Add company name input if needed */}
      {/* Rest of the form */}
      {/* ... */}
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
          <Text style={styles.loginButtonText}>기업 회원 로그인</Text>
        )}
      </Pressable>
    </DismissKeyboardView>
  );
}

// Add styles for company name input if needed
// Rest of the styles remain the same
// ...

export default MakersLogin;
