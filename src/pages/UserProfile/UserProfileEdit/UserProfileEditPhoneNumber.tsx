import React, {useState} from 'react';
import {TextInput, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';

const UserProfileEditPhoneNumber = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleSavePhoneNumber = async () => {
    try {
      await axios.post(`${Config.API_URL_PAPAYATEST}/members/phone`, {
        email: userEmail,
        phone: phoneNumber,
      });
      Alert.alert('성공', '전화번호가 성공적으로 업데이트되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('전화번호 업데이트 실패', error);
      Alert.alert('오류', '전화번호 업데이트에 실패했습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="새 전화번호 입력"
        keyboardType="phone-pad"
      />
      <Button title="전화번호 저장" onPress={handleSavePhoneNumber} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default UserProfileEditPhoneNumber;
