import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Button,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/reducer';
import {logout} from '../../slices/user';
import axios from 'axios';
import Config from 'react-native-config';
import * as NavigationService from '../../utils/NavigationService';
import {useNavigation} from '@react-navigation/native';
import {useRefresh} from '../../utils/RefreshContext';

interface UserData {
  name: string;
  id?: number;
  email?: string;
  phone?: string;
  image?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
  address3?: string;
}

const {width} = Dimensions.get('window');

const UserProfile = () => {
  const navigation = useNavigation();
  const userEmail = useSelector((state: RootState) => state.user.email);
  const [userData, setUserData] = useState<UserData>({});
  const dispatch = useDispatch();
  const {refreshing, onRefresh} = useRefresh(); // 추가된 부분

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${Config.API_URL_PAPAYATEST}/members`, {
        params: {email: userEmail},
      });
      const member = response.data.find(m => m.email === userEmail);
      if (member) {
        setUserData(member);
      } else {
        Alert.alert('Error', 'Member not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch member profile');
    }
  }, [userEmail]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const navigateToEditName = () => {
    navigation.navigate('UserProfileEditName');
  };

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
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => onRefresh(fetchUserProfile)}
        /> // 수정된 부분
      }>
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
          <Button
            title="Edit1"
            onPress={() => NavigationService.navigate('UserProfileEditImage')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoContent}>
            {userData.name || 'No name provided'}
          </Text>
          <Button
            title="EDIT"
            onPress={() => navigation.navigate('UserProfileEditName')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text style={styles.infoContent}>
            {userData.phone || 'No phone number provided'}
          </Text>
          <Button
            title="Edit3"
            onPress={() =>
              NavigationService.navigate('UserProfileEditPhoneNumber')
            }
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infoContent}>
            {userData.zipCode ||
            userData.address1 ||
            userData.address2 ||
            userData.address3
              ? `${userData.zipCode} ${userData.address1} ${userData.address2} ${userData.address3}`
              : 'No address provided'}
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
    height: width / 3, // Make it a square
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'pink', // A light grey background
    borderRadius: 10, // Optional: if you want rounded corners
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 6,
  },
  noImageText: {
    color: '#888',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
