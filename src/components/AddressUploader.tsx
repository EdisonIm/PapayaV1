import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

interface AddressUploaderProps {
  userEmail: string;
}

const AddressUploader: React.FC<AddressUploaderProps> = ({userEmail}) => {
  const [zipCode, setZipCode] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [address3, setAddress3] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${Config.API_URL_PAPAYATEST}/members/address`, {
        email: userEmail,
        zipCode,
        address1,
        address2,
        address3,
      });
      Alert.alert('Success!', 'Address successfully updated!');
    } catch (axiosError) {
      const e = axiosError as AxiosError;
      let errorMessage = 'Failed to update address. Please try again.';
      if (e.response) {
        errorMessage += `\nError Status Code: ${e.response.status}`;
      } else if (e.request) {
        errorMessage += '\nNo response from the server.';
      } else {
        errorMessage += `\n${e.message}`;
      }
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="우편번호"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <TextInput
        placeholder="주소 1"
        value={address1}
        onChangeText={setAddress1}
        style={styles.textInput}
      />
      <TextInput
        placeholder="주소 2"
        value={address2}
        onChangeText={setAddress2}
        style={styles.textInput}
      />
      <TextInput
        placeholder="주소 3"
        value={address3}
        onChangeText={setAddress3}
        style={styles.textInput}
      />
      <Button
        onPress={handleSubmit}
        title="주소 변경하기"
        disabled={isSubmitting || !zipCode || !address1}
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

export default AddressUploader;
