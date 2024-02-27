import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useAppDispatch} from '../store';
import {updateUserInfo} from '../slices/user'; // 가정: user 슬라이스에 updateUserInfo 액션이 정의되어 있음

const {width} = Dimensions.get('window');

const UserProfileEdit = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const handleSave = () => {
    // 사용자 정보 업데이트 로직
    dispatch(updateUserInfo({email}));
    // 저장 후 액션, 예: 알림 표시 또는 페이지 이동
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// 스타일은 기존의 것을 참조하거나 필요에 따라 조정
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.025,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6E7F80',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UserProfileEdit;
