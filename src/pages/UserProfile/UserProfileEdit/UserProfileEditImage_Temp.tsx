import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import useImageUpload from '../hooks/useImageUpload';

const UserProfileEditImage = () => {
  const {handleUploadImage, imageUrl, isUploading, setImage, uploadError} =
    useImageUpload(onImageUploaded);

  // 이미지가 업로드된 후 처리할 로직
  function onImageUploaded(url: string) {
    // 업로드된 이미지 URL을 사용하는 로직을 여기에 추가
    // 예를 들어 상태 업데이트나, navigation.goBack() 등
    Alert.alert('Image Uploaded', 'Image URL: ' + url);
  }

  // 사용자가 이미지를 선택하도록 하는 함수
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImage(asset);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Text>Uploaded Image URL: {imageUrl}</Text>
      ) : (
        <Button title="Select Image" onPress={selectImage} />
      )}
      <Button
        title="Upload Image"
        onPress={handleUploadImage}
        disabled={isUploading}
      />
      {isUploading && <Text>Uploading...</Text>}
      {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default UserProfileEditImage;
