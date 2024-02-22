import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

interface PhoneNumberUploaderProps {
  userEmail: string;
}

const PhoneNumberUploader: React.FC<PhoneNumberUploaderProps> = ({
  userEmail,
}) => {
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${Config.API_URL_PAPAYATEST}/members/phone`, {
        email: userEmail, // 이메일 주소를 prop에서 직접 사용합니다.
        phone,
      });
      Alert.alert('성공!', '전화번호가 성공적으로 제출되었습니다!');
    } catch (error) {
      let errorMessage = '제출에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      Alert.alert('오류', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        style={styles.textInput}
        keyboardType="phone-pad"
      />
      <Button
        onPress={handleSubmit}
        title="전화번호 제출"
        disabled={isSubmitting || !phone}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 7,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PhoneNumberUploader;
