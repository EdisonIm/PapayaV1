import React, { useState } from 'react';
import { Button, Text, View, Pressable } from 'react-native';
import { useAtom } from 'jotai';
import styled, { useTheme } from 'styled-components/native';
import Typography from '../../../components/Typography';
import LocationCircle from '../../../components/Location';

import Header from '../../../layouts/Header';
import SearchButton from './components/SearchButton';
import Search from './components/Search';
import TeamInput from '../../CreateTeam/components/TeamInput';
import { MainTabProps } from '../../../utils/types/navigation';
import BottomSheet from '../../../components/BottomSheet';
import NaverMapView, { Coord, Marker } from 'react-native-nmap';
import { useMyTeamList, useTeamMapList } from '../../../hooks/team';
import { searchTeamInitAtom } from '../../../utils/store';
import { USER_ID } from '../../../config/const';

export interface IPageProps {
  route: any;
}

export const TAB_NAME = 'T_SEARCHTEAM';
const SearchTeamPages = ({ route, navigation }: MainTabProps<'T_SEARCHTEAM'>) => {
  const themeApp = useTheme();
  const params = route.params;
  const [tab, setTab] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // TODO : 로그인구현 후 userId 받아와서 넘겨주기
  const { myTeamlist } = useMyTeamList(USER_ID);
  const [initCenter, setInitCenter] = useAtom(searchTeamInitAtom);

  const { teamMapList } = useTeamMapList(
    initCenter.latitude,
    initCenter.longitude,
  );

  const handleCameraChange = (event: any) => {
    const newCenter = { latitude: event.latitude, longitude: event.longitude };

    setInitCenter(newCenter);
  };
  // console.log(teamMapList);
  return (
    <Wrap>
      <Header label="팀찾기" back={false} border={false} />
      <SearchButton from={'팀찾기'} />
      <MapWrap>
        <LocationButton>
          <LocationCircle setInitCenter={setInitCenter} />
        </LocationButton>
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          center={{ ...initCenter, zoom: 16 }}
          zoomControl={false}
          onCameraChange={handleCameraChange}
        >
          {teamMapList?.map(el => {
            const center = {
              latitude: el.latitude,
              longitude: el.longitude,
            };

            return (
              <Marker
                onClick={() => {
                  // e.stopPropagation();
                  setTab(el.id);
                  // markerPress();
                  setModalVisible(true);
                }}
                // onPress={(e:any )=> {
                //   e.stopPropagation();
                //   setTab(el.id);
                //   // markerPress();
                //   setModalVisible(true);
                // }}
                key={el.id}
                coordinate={center}
              // width={43}
              // height={43}
              // image={
              //   tab === el.id
              //     ? require('./icon/selectTab.png')
              //     : require('./icon/tab.png')
              // }
              />
            );
          })}
        </NaverMapView>
      </MapWrap>

      {modalVisible && teamMapList && myTeamlist && (
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={teamMapList?.filter(el => el.id === tab)}
          isMember={myTeamlist?.some(item => item.teamId === tab)}
        />
      )}
    </Wrap>
  );
};

export default SearchTeamPages;

const Wrap = styled.View`
  background-color: white;
  flex: 1;
`;

const MapWrap = styled.View`
  flex: 1;
  margin-top: 8px;
`;

const LocationButton = styled.View`
  position: absolute;
  z-index: 1;
  bottom: 24px;
  right: 24px;
`;
