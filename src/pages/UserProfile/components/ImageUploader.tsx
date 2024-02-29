import React from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import useImageUpload from '../hooks/useImageUpload';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer'; // 경로는 실제 프로젝트에 맞게 조정해주세요.

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({onImageUploaded}) => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const {handleUploadImage, imageUrl, isUploading, setImage, uploadError} =
    useImageUpload(onImageUploaded, userEmail);

  const handleSelectPress = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* 이메일 입력 필드 관련 코드 제거 */}
      <TouchableOpacity onPress={handleSelectPress} style={styles.button}>
        <Text style={styles.buttonText}>사진 선택하기</Text>
      </TouchableOpacity>
      <Button
        onPress={() => handleUploadImage(userEmail)} // 수정된 부분
        title="사진 올리기"
        disabled={isUploading}
      />
      {isUploading && <Text>업로드 중...</Text>}
      {imageUrl && <Text>업로드 완료: {imageUrl}</Text>}
      {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ImageUploader;
