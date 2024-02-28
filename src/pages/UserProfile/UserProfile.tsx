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
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); // Get the width of the device

const UserProfile = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL_PAPAYATEST}/members`,
        );
        const user = response.data.find(user => user.email === userEmail);
        if (user) {
          setUserData(user);
        } else {
          console.error('User not found');
          Alert.alert('Error', 'User not found');
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        Alert.alert('Error', 'Failed to fetch user profile');
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
          navigation.navigate('MainPage');
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
