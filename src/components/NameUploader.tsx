import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

interface NameUploaderProps {
  userEmail: string;
}

const NameUploader: React.FC<NameUploaderProps> = ({userEmail}) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await axios.post(`${Config.API_URL_PAPAYATEST}/members/name`, {
        email: userEmail, // userEmail prop을 사용
        name: name,
      });
      Alert.alert('Success', 'Name registration succeeded!');
    } catch (catchError) {
      const errorMessage = 'Failed to register name. Please try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />
      <Button
        onPress={handleSubmit}
        title="이름 등록하기"
        disabled={isSubmitting || !name}
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

export default NameUploader;
