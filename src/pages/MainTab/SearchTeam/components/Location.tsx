import styled, {useTheme} from 'styled-components/native';
import LocationIcon from '~assets/icons/Team/location.svg';
import Typography from '../../../../components/Typography';
import ArrowIcon from '~assets/icons/Team/arrowRight.svg';
import {
  Linking,
  NativeModules,
  Platform,
  PermissionsAndroid,
  Alert,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {SetStateAction} from 'react';
import {createTeamInitAtom, searchTeamInitAtom} from '../../../../utils/store';
import {useAtom} from 'jotai';

interface IProps {
  setInitCenter: React.Dispatch<
    SetStateAction<{latitude: number; longitude: number}>
  >;
}

const Location = ({setInitCenter}: IProps) => {
  const themeApp = useTheme();
  // const [initCenter, setInitCenter] = useAtom(searchTeamInitAtom);

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:root');
    }
  };
  const userLocation = () => {
    if (Platform.OS === 'ios') {
      requestLocationIosPermission();
    } else {
      requestLocationAndroidPermission();
    }
  };
  const requestLocationIosPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');

      if (granted === 'granted') {
        getLocation();
      } else {
        Alert.alert('커런트', '위치 사용을 위해 접근 권한을 허용해 주세요', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => {
              openAppSettings();
            },
          },
        ]);
      }
    } catch (error) {
      console.log('Error requesting location permission: ', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log(latitude, longitude, 'sffssf');
        setInitCenter({latitude: latitude, longitude: longitude});
      },
      error => {
        console.error(error.code, error.message, '에러');
      },
      {enableHighAccuracy: true, timeout: 1500, maximumAge: 1000},
    );
  };

  const requestLocationAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '커런트',
          message: `'정확한 위치' 접근 권한을 허용해 주세요`,
          buttonNeutral: '다음에 다시 묻기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;

          setInitCenter({
            latitude: latitude,
            longitude: longitude,
          });
        });
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        // setShow(true);
        // toast.toastEvent();
        // setTimeout(() => {
        //   setShow(false);
        // }, 3000);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <LocationWrap onPress={userLocation}>
      <LocationView>
        <IconWrap>
          <LocationIcon />
        </IconWrap>
        <Typography text="Body06R" textColor={themeApp.colors.gray[2]}>
          현재 위치로 설정
        </Typography>
      </LocationView>
      <ArrowIcon />
    </LocationWrap>
  );
};

export default Location;

const LocationWrap = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
`;

const LocationView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconWrap = styled.View`
  margin-right: 4px;
`;
