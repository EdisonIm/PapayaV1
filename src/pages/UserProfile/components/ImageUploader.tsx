import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import useImageUpload from '../hooks/useImageUpload';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({onImageUploaded}) => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const {handleUploadImage, imageUrl, isUploading, setImage, uploadError} =
    useImageUpload(onImageUploaded);

  const handleSelectPress = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectPress} style={styles.button}>
        <Text style={styles.buttonText}>사진 선택하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleUploadImage(userEmail)}
        style={[
          styles.button,
          {opacity: isUploading ? 0.5 : 1},
          {backgroundColor: 'orange'},
        ]}
        disabled={isUploading}>
        <Text style={styles.buttonText}>
          {isUploading ? '업로드 중...' : '사진 올리기'}
        </Text>
      </TouchableOpacity>
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
    width: '100%',
    height: 55,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 30,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ImageUploader;
