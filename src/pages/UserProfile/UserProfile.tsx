//모든 정보는 나오는데 무한루프가 해결 안됨
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Dimensions,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/reducer';
import {logout} from '../../slices/user';
import axios from 'axios';
import Config from 'react-native-config';
import * as NavigationService from '../../utils/NavigationService';
import {useNavigation} from '@react-navigation/native';
import {useRefresh} from '../../utils/RefreshContext';
import {useIsFocused} from '@react-navigation/native'; // 현재 화면의 포커스 상태를 확인하기 위해 추가

const {width} = Dimensions.get('window');
const DEFAULT_IMAGE_URI = 'https://example.com/default-image.jpg'; // 실제 사용하는 기본 이미지 URL로 변경

interface UserData {
  name: string;
  id?: number;
  email?: string;
  phone?: string;
  image?: {
    key: string;
    location: string;
    name: string;
  };
  zipCode?: string;
  address1?: string;
  address2?: string;
  address3?: string;
}

const UserProfile = () => {
  const navigation = useNavigation();
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dispatch = useDispatch();
  const {refreshing, onRefresh} = useRefresh();
  const isFocused = useIsFocused(); // 현재 화면의 포커스 상태

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${Config.API_URL_PAPAYATEST}/members`, {
        params: {email: userEmail},
      });
      const member = response.data.find(m => m.email === userEmail);
      if (member) {
        const {name, phone, image, address} = member;
        // address 객체에서 주소 정보 추출
        const {zipCode, address1, address2, address3} = address || {};
        setUserData({
          name,
          phone,
          image,
          zipCode,
          address1,
          address2,
          address3,
        });
      } else {
        Alert.alert('Error', 'Member not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch member profile');
    }
  }, [userEmail]);

  useEffect(() => {
    if (isFocused || refreshing) {
      // 화면이 포커스 되거나 새로고침이 요청될 때 사용자 정보를 다시 불러옵니다.
      fetchUserProfile();
    }
  }, [fetchUserProfile, isFocused, refreshing]); // 의존성 배열에 isFocused와 refreshing 추가

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout());
          NavigationService.navigate('MainPage');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <Text style={styles.header}>User Profile</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{uri: userData?.image?.location || DEFAULT_IMAGE_URI}}
            style={styles.image}
            resizeMode="cover"
          />
          <Button
            title="Edit Image"
            onPress={() => navigation.navigate('ImageUploader', {userEmail})}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoContent}>
            {userData?.name || 'No name provided'}
          </Text>
          <Button
            title="Edit Name"
            onPress={() => navigation.navigate('UserProfileEditName')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text style={styles.infoContent}>
            {userData?.phone || 'No phone number provided'}
          </Text>
          <Button
            title="Edit Phone"
            onPress={() => navigation.navigate('UserProfileEditPhoneNumber')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infoContent}>
            {userData?.zipCode && `${userData.zipCode}\n`}
            {userData?.address1 && `${userData.address1}\n`}
            {userData?.address2 && `${userData.address2}\n`}
            {userData?.address3 || 'No address provided'}
          </Text>
          <Button
            title="Edit4"
            onPress={() => NavigationService.navigate('UserProfileEditAddress')}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
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
  imageContainer: {
    height: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContent: {
    fontSize: 16,
    flexShrink: 1,
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
