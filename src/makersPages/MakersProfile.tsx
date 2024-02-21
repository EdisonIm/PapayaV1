import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ImageUploader from '../components/ImageUploader';
import MakersNameUploader from '../makersComponents/MakersNameUploader';
import MakersAddressUploader from '../makersComponents/MakersAddressUploader';
import MakersPhoneNumberUploader from '../makersComponents/MakersPhoneNumberUploader';

const MakersProfile = () => {
  const makersEmail = 'makers@example.com';
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
          <Text style={styles.headerText}>기업 프로필 관리 페이지</Text>
        </View>
        <ImageUploader onImageUploaded={handleImageUpload} />
        <MakersNameUploader makersEmail={makersEmail} />
        <MakersAddressUploader makersEmail={makersEmail} />
        <MakersPhoneNumberUploader makersEmail={makersEmail} />
        {uploadedImageText}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'orange', // 배경색 변경 가능
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
    color: 'blue', // 제목 색상 변경 가능
  },
});

export default MakersProfile;
