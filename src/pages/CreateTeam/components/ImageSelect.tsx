import {View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Typography from '../../../components/Typography';
import ImageIcon from '../../../assets/icons/Team/image.svg';
import {launchImageLibrary} from 'react-native-image-picker';

import {SetStateAction, useState} from 'react';

interface ImageSelectProps {
  setShowDate: React.Dispatch<SetStateAction<boolean>>;
  setShowTime: React.Dispatch<SetStateAction<boolean>>;
  setImgURL: React.Dispatch<SetStateAction<string | undefined>>;
}

const ImageSelect = ({
  setShowDate,
  setShowTime,
  setImgURL,
}: ImageSelectProps) => {
  const themeApp = useTheme();

  const [imageFile, setImageFile] = useState<any>(null);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          console.log('Image Error : ' + response.errorCode);
        }
        if (response.assets && response.assets.length > 0) {
          setImageFile(response.assets[0].uri);
          setImgURL(response.assets[0].uri);
        }
        //   setResponse(response);
      },
    );
  };
  return (
    <View>
      {imageFile ? (
        <ImageBox
          onPress={() => {
            onSelectImage();
            setShowDate(false);
            setShowTime(false);
          }}>
          <ImageCover>
            <TypoWrap>
              <IconWrap>
                <ImageIcon color="#ffffff" />
              </IconWrap>
              <Typography text="Body06SB" textColor={themeApp.colors.gray[0]}>
                이미지 변경
              </Typography>
            </TypoWrap>
          </ImageCover>
          <ImageView source={{uri: imageFile}} />
        </ImageBox>
      ) : (
        <ImageBox onPress={onSelectImage}>
          <TypoWrap>
            <IconWrap>
              <ImageIcon color="#79767D" />
            </IconWrap>
            <Typography text="Body06SB" textColor={themeApp.colors.gray[4]}>
              이미지 선택
            </Typography>
          </TypoWrap>
        </ImageBox>
      )}
    </View>
  );
};

export default ImageSelect;

const ImageBox = styled.Pressable`
  background-color: ${({theme}) => theme.colors.gray[8]};
  border: 1px solid ${({theme}) => theme.colors.gray[7]};
  height: 192px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const TypoWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const IconWrap = styled.View`
  margin-right: 4px;
`;

const ImageView = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
const ImageCover = styled.View`
  background-color: #00000066;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  border-radius: 12px;
`;
