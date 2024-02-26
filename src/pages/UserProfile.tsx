import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/reducer';
import {logout} from '../slices/user'; // logout 액션을 임포트합니다.
import {LoggedInParamList} from '../../AppInner';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const {width} = Dimensions.get('window');

type UserProfileNavigationProp = BottomTabNavigationProp<
  LoggedInParamList,
  'UserProfile'
>;

const UserProfile = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const navigation = useNavigation<UserProfileNavigationProp>();
  const dispatch = useDispatch(); // useDispatch 훅을 사용합니다.

  const handleEditPress = () => {
    navigation.navigate('UserProfileEdit');
  };

  const handleLogoutPress = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout()); // logout 액션을 디스패치합니다.
          navigation.navigate('Login'); // 로그인 화면으로 네비게이션합니다.
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Email: {userEmail}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>정보 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}>
          <Text style={styles.buttonText}>로그아웃</Text>
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
  logoutButton: {
    backgroundColor: '#D9534F', // 로그아웃 버튼에는 다른 색상을 사용합니다.
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
