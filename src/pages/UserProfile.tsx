import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {LoggedInParamList} from '../../AppInner'; // AppInner에서 정의한 LoggedInParamList를 임포트합니다.
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'; // BottomTabNavigator에 대한 타입

const {width} = Dimensions.get('window');

// LoggedInParamList를 사용하여 네비게이션 프롭 타입을 정의합니다.
type UserProfileNavigationProp = BottomTabNavigationProp<
  LoggedInParamList,
  'UserProfile'
>;

const UserProfile = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const navigation = useNavigation<UserProfileNavigationProp>(); // 타입 정의를 사용하여 useNavigation 훅을 호출합니다.

  const handleEditPress = () => {
    navigation.navigate('UserProfileEdit'); // 'UserProfileEdit' 스크린으로 네비게이션
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Email: {userEmail}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>정보 수정</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.025,
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

export default UserProfile;
