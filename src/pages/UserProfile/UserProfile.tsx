import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/reducer';
import {logout} from '../../slices/user';
import axios from 'axios';
import Config from 'react-native-config';
import * as NavigationService from '../../utils/NavigationService';

interface UserData {
  id?: number;
  email?: string;
  phone?: number;
  image?: string;
  zipCode?: number;
  address1?: string;
  address2?: string;
  address3?: string;
}

const {width} = Dimensions.get('window'); // Get the width of the device

const UserProfile = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [userData, setUserData] = useState<UserData>({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL_PAPAYATEST}/members`,
        );
        // 변경된 부분: 변수 이름 'user'를 'members'로 변경
        const members = response.data.find(
          (members: any) => members.email === userEmail,
        );
        if (members) {
          setUserData(members);
        } else {
          console.error('Members not found');
          Alert.alert('Error', 'Members not found');
        }
      } catch (error) {
        console.error('Failed to fetch members profile', error);
        Alert.alert('Error', 'Failed to fetch members profile');
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout());
          // 사용자 정의 네비게이션 서비스를 사용하여 'MainPage'로 이동
          NavigationService.navigate('MainPage');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>User Profile</Text>
        <View style={styles.imageContainer}>
          {userData.image ? (
            <Image
              source={{uri: userData.image}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No image</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text>{userData.email}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>ID(Name):</Text>
          <Text>{userData.id}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text>{userData.phone || 'No phone number provided'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infoContent}>
            {userData.zipCode ||
            userData.address1 ||
            userData.address2 ||
            userData.address3
              ? `${userData.zipCode} ${userData.address1} ${userData.address2} ${userData.address3}`
              : 'No address provided'}
          </Text>
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
    width: width / 3, // Set the width to 1/3 of the screen width
    height: width / 3, // Make it a square
    justifyContent: 'center', // Center the content
    alignItems: 'center', // Center the content
    marginBottom: 20, // Add some margin below
    backgroundColor: 'pink', // A light grey background
    borderRadius: 10, // Optional: if you want rounded corners
  },
  image: {
    width: '100%', // Fill the container
    height: '100%', // Fill the container
    borderRadius: 10, // Match the container's borderRadius
  },
  noImageText: {
    color: '#888', // A medium grey color
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
