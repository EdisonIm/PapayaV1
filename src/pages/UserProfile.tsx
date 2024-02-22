import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import ImageUploader from '../components/ImageUploader';
import NameUploader from '../components/NameUploader';
import AddressUploader from '../components/AddressUploader';
import PhoneNumberUploader from '../components/PhoneNumberUploader';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import userSlice from '../slices/user';

const {width} = Dimensions.get('window'); // 화면 너비를 가져옵니다.

const UserProfile = () => {
  const userEmail = useSelector(state => state.user.email);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  const handleLogout = () => {
    dispatch(userSlice.actions.setUser(null));
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ImageUploader onImageUploaded={handleImageUpload} />
        <NameUploader userEmail={userEmail} />
        <AddressUploader userEmail={userEmail} />
        <PhoneNumberUploader userEmail={userEmail} />
        {uploadedImageUrl && (
          <Image
            source={{uri: uploadedImageUrl}}
            style={styles.uploadedImage}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
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
    paddingHorizontal: width * 0.025, // 좌우 패딩을 화면 너비의 2.5%로 설정
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6E7F80',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20, // 버튼 간의 수직 간격 추가
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // 기타 스타일...
});

export default UserProfile;
