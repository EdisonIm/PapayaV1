import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ImageUploader from '../components/ImageUploader';
import NameUploader from '../components/NameUploader';
import AddressUploader from '../components/AddressUploader';
import PhoneNumberUploader from '../components/PhoneNumberUploader';

const UserProfile = () => {
  const userEmail = 'user@example.com';
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  let uploadedImageText = null;
  if (uploadedImageUrl) {
    uploadedImageText = <Text>업로드된 이미지 URL: {uploadedImageUrl}</Text>;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>사용자 프로필 야매 수정 페이지</Text>
        </View>
        <ImageUploader onImageUploaded={handleImageUpload} />
        <NameUploader userEmail={userEmail} />
        <AddressUploader userEmail={userEmail} />
        <PhoneNumberUploader userEmail={userEmail} />
        {uploadedImageText}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container: {
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default UserProfile;
