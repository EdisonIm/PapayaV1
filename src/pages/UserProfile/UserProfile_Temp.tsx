//모든 정보 표시, 무한루프 해결 필요
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
import {useNavigation} from '@react-navigation/native';
import {useRefresh} from '../../utils/RefreshContext';
import {useIsFocused} from '@react-navigation/native';
import * as NavigationService from '../../utils/NavigationService';

const {width} = Dimensions.get('window');
const DEFAULT_IMAGE_URI = 'https://example.com/default-image.jpg';

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
  const isFocused = useIsFocused();

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
      fetchUserProfile();
    }
  }, [fetchUserProfile, isFocused, refreshing]);

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

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate('ImageUploader', {userEmail})}>
          <Image
            source={{uri: userData?.image?.location || DEFAULT_IMAGE_URI}}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Name:</Text>
          <TouchableOpacity
            style={styles.infoContent}
            onPress={() => navigation.navigate('UserProfileEditName')}>
            <Text style={styles.infoValue}>
              {userData?.name || 'No name provided'}
            </Text>
            <Text style={styles.editIcon}>▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <TouchableOpacity
            style={styles.infoContent}
            onPress={() => navigation.navigate('UserProfileEditPhoneNumber')}>
            <Text style={styles.infoValue}>
              {userData?.phone || 'No phone number provided'}
            </Text>
            <Text style={styles.editIcon}>▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Address:</Text>
          <TouchableOpacity
            style={styles.infoContent}
            onPress={() => navigation.navigate('UserProfileEditAddress')}>
            <Text style={styles.infoValue}>
              {userData?.zipCode && `${userData.zipCode}\n`}
              {userData?.address1 && `${userData.address1}\n`}
              {userData?.address2 && `${userData.address2}\n`}
              {userData?.address3 || 'No address provided'}
            </Text>
            <Text style={styles.editIcon}>▶</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
  },
  editIcon: {
    marginLeft: 5,
    fontSize: 18,
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
    fontSize: 15,
  },
});

export default UserProfile;
