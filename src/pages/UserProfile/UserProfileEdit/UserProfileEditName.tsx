import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';

const UserProfileEditName = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [name, setName] = useState('');
  const navigation = useNavigation();

  // 정보 저장 핸들러
  const handleSave = async () => {
    // 예: API 호출로 사용자 이름 업데이트
    try {
      // PUT 대신 POST 요청으로 변경
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/members/name`,
        {
          email: userEmail,
          name,
        },
      );
      if (response.data.success) {
        Alert.alert('성공!', '이름이 잘 저장되었습니다!');
        navigation.goBack(); // 성공 후 뒤로 가기
      } else {
        Alert.alert('Error', 'There was a problem updating your name.');
      }
    } catch (error) {
      console.error('Failed to update name', error);
      Alert.alert('Error', 'Failed to update name');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your new name"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Screen width-based styling
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.025,
    paddingTop: 20,
    paddingBottom: 50,
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
  button: {
    backgroundColor: '#4e9af1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileEditName;
