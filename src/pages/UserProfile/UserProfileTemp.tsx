import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/reducer';
import {logout} from '../../slices/user';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';

const UserProfile = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(''); //회원정보 조회 실패시 메시지 팝업 기능 만들것
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogoutPress = () => {
    Alert.alert('Logout', '정말 로그아웃 하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '로그아웃',
        onPress: () => {
          dispatch(logout());
          navigation.navigate('MainPage');
        },
      },
    ]);
  };

  useEffect(() => {
    axios
      .get(`${Config.API_URL_PAPAYATEST}/user/profile`, {
        params: {email: userEmail},
      })
      .then(response => {
        setName(response.data.name);
        setPhone(response.data.phone);
        setZipCode(response.data.zipCode);
        setAddress1(response.data.address1);
        setAddress2(response.data.address2);
        setAddress3(response.data.address3);
      })
      .catch(error => {
        console.error('Failed to fetch user profile', error);
      });
  }, [userEmail]);

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

      await axios.post(`${Config.API_URL_PAPAYATEST}/members/phone`, {
        email: userEmail,
        phone,
      });

      await axios.post(`${Config.API_URL_PAPAYATEST}/members/name`, {
        email: userEmail,
        name,
      });

      Alert.alert('성공!', '주소 및 전화번호가 성공적으로 변경되었습니다!');
    } catch (axiosError) {
      const e = axiosError as AxiosError;
      let errorMessage = '정보 업데이트에 실패했습니다. 다시 시도해주세요.';
      if (e.response) {
        errorMessage += `\n에러 상태 코드: ${e.response.status}`;
      } else if (e.request) {
        errorMessage += '\n서버로부터의 응답이 없습니다.';
      } else {
        errorMessage += `\n${e.message}`;
      }
      setError(errorMessage);
      Alert.alert('에러', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>User Profile</Text>

        {/* 이메일 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text>{userEmail}</Text>
        </View>
        {/* 전화번호 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.infoTitle}>전화번호:</Text>
          <Text style={styles.infoContent}>
            {phone || '등록된 전화번호가 없습니다'}
          </Text>
        </View>
        {/* 이름 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoContent}>
            {name || '등록된 이름이 없습니다'}
          </Text>
        </View>
        {/* 주소 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.infoTitle}>주소:</Text>
          <Text style={styles.infoContent}>
            {zipCode && address1
              ? `${zipCode} ${address1} ${address2} ${address3}`
              : '등록된 주소가 없습니다'}
          </Text>
        </View>
        <Button
          title="정보 수정"
          onPress={() => navigation.navigate('UserProfileEdit')}
        />
        {/* 로그아웃 버튼 섹션 */}
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
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default UserProfile;
