import {useState} from 'react';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Asset} from 'react-native-image-picker';

// onImageUploaded 콜백 함수를 받는 useImageUpload 훅 정의
function useImageUpload(onImageUploaded: (url: string) => void) {
  const [image, setImage] = useState<Asset | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // 업로드 함수에서 email 파라미터를 제거합니다.
  const handleUploadImage = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('multipartFile', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'upload.jpg',
    });
    // 여기에서 현재 로그인된 사용자의 이메일을 사용하도록 수정
    // 예: formData.append('email', loggedInUserEmail);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `${Config.API_URL_PAPAYATEST}/members/pic`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (
        response.data &&
        response.data.image &&
        response.data.image.location
      ) {
        setImageUrl(response.data.image.location);
        onImageUploaded(response.data.image.location);
      }
    } catch (error) {
      const e = error as AxiosError;
      let errorMessage = '업로드 실패: ';
      if (e.response) {
        errorMessage += `에러 상태 코드: ${e.response.status}`;
      } else if (e.request) {
        errorMessage += '서버 응답 없음';
      } else {
        errorMessage += e.message;
      }
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleUploadImage,
    imageUrl,
    isUploading,
    setImage,
    uploadError,
  };
}

export default useImageUpload;
