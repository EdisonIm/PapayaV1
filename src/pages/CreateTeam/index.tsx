import React, {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import Header from '../../layouts/Header';
import styled, {useTheme} from 'styled-components/native';
import SearchButton from '../MainTab/SearchTeam/components/SearchButton';
import {RootStackProps} from '../../utils/types/navigation';
import Typography from '../../components/Typography';
import LocationCircle from '../../components/Location';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useGetRoadAddress} from '../../hooks/map';
import {createTeamInitAtom} from '../../utils/store';
import {useAtom} from 'jotai';

interface ButtonProps {
  disabled: boolean;
}

export interface IPageProps {
  route: any;
}
export const PAGE_NAME = 'P_CREATETEAM';
export const TAB_NAME = 'T_CREATETEAM';
const Pages = ({route, navigation}: RootStackProps<'P_CREATETEAM'>) => {
  const params = route.params;
  const themeApp = useTheme();

  const [move, setMove] = useState(false);
  const [initCenter, setInitCenter] = useAtom(createTeamInitAtom);
  const {roadAddress, refetch} = useGetRoadAddress(
    initCenter.longitude,
    initCenter.latitude,
  );

  const handleCameraChange = (event: any) => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};

    //  setZoom(event.zoom);
    if (move) {
      setInitCenter(newCenter);
    }
    setMove(false);
  };

  const goToCreatePage = () => {
    navigation.navigate('P_TEAMINPUT', {
      address: roadAddress?.address,
      roadAddress: roadAddress?.roadAddress,
      zipCode: roadAddress?.zipcode,
      latitude: initCenter.latitude,
      longitude: initCenter.longitude,
    });
  };

  useEffect(() => {
    refetch();
  }, [initCenter, roadAddress]);

  return (
    <Wrap>
      <Header label="팀 생성" border={false} />
      <SearchButton from={'팀생성'} />
      <MapWrap
        onPressIn={() => {
          if (Platform.OS === 'ios') setMove(true);
        }}
      >
        <LocationButton>
          <LocationCircle setInitCenter={setInitCenter} />
        </LocationButton>
        <NaverMapView
          onTouch={() => {
            if (Platform.OS === 'android') setMove(true);
          }}
          center={{...initCenter, zoom: 16}}
          style={{width: '100%', height: '100%'}}
          zoomControl={false}
          onCameraChange={handleCameraChange}
        >
          <Marker coordinate={initCenter} />
        </NaverMapView>
      </MapWrap>
      <AddressWrap>
        <Typography text="Title03SB" textColor={themeApp.colors.gray[2]}>
          {roadAddress?.roadAddress}
        </Typography>
        <JibunAddress>
          <Jibun>
            <Typography text="SmallLabel" textColor={themeApp.colors.gray[4]}>
              지번
            </Typography>
          </Jibun>
          <Typography text="Body06R" textColor={themeApp.colors.gray[4]}>
            {roadAddress?.address}
          </Typography>
        </JibunAddress>
      </AddressWrap>
      <ButtonContainer>
        <CreateButton onPress={goToCreatePage} disabled={false}>
          <Typography text="BottomButtonSB" textColor={themeApp.colors.gray[6]}>
            생성하기
          </Typography>
        </CreateButton>
      </ButtonContainer>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: white;
  flex: 1;
  padding-bottom: 40px;
`;

const MapWrap = styled.Pressable`
  margin-top: 8px;
  flex: 1;
`;

const AddressWrap = styled.View`
  margin: 24px;
`;
const Jibun = styled.View`
  background-color: ${({theme}) => theme.colors.gray[8]};
  align-self: flex-start;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
`;

const JibunAddress = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;
const CreateButton = styled.Pressable<ButtonProps>`
  width: 100%;
  height: 56px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({disabled, theme}) =>
    disabled ? theme.colors.blue[500] : theme.colors.gray[8]};
`;
const ButtonContainer = styled.View`
  width: 100%;
  /* position: absolute;
  bottom: 40px; */
  padding-left: 24px;
  padding-right: 24px;
`;
const LocationButton = styled.View`
  position: absolute;
  z-index: 1;
  bottom: 24px;
  right: 24px;
`;
