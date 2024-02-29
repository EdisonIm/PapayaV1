// UserProfileEditAddress.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import {useNavigation} from '@react-navigation/native';

const UserProfileEditAddress = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!zipCode.trim() || !address1.trim()) {
      Alert.alert('Error', 'Zip code and Address 1 are required.');
      return;
    }

    try {
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/members/address`,
        {
          email: userEmail,
          zipCode,
          address1,
          address2,
          address3,
        },
      );
      Alert.alert('Success!', 'Address successfully updated!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // 충돌을 처리하는 사용자 정의 메시지
        Alert.alert(
          'Conflict',
          'The address you are trying to save conflicts with an existing one.',
        );
      } else {
        Alert.alert('Error', 'Failed to update address. Please try again.');
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={zipCode}
          onChangeText={setZipCode}
          placeholder="Zip Code"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={address1}
          onChangeText={setAddress1}
          placeholder="Address 1"
        />
        <TextInput
          style={styles.input}
          value={address2}
          onChangeText={setAddress2}
          placeholder="Address 2"
        />
        <TextInput
          style={styles.input}
          value={address3}
          onChangeText={setAddress3}
          placeholder="Address 3"
        />
        <Button onPress={handleSave} title="Save Address" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F5F5',
  },
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

export default UserProfileEditAddress;
