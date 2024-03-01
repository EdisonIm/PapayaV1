import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import Typography from '../Typography';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { tMakers } from '../../utils/types/teamType';

interface IMakersInfoProps {
  isMakers: boolean;
  makers: tMakers;
  teamId: number;
  latitude: number;
  longitude: number;
}
const Component = ({ isMakers, makers, teamId, latitude, longitude }: IMakersInfoProps) => {
  const themeApp = useTheme();
  const navigation = useNavigation<any>();
  return (
    <Container>
      <Typography text="Body07R" textColor={themeApp.colors.gray[4]}>
        메이커스
      </Typography>
      <SelectMakers
        onPress={() => {
          if (isMakers) navigation.navigate('P_MAKERS_INFO', {
            id: makers?.id,
            storeName: makers?.name,
            image: makers?.image
          });
          else navigation.navigate('P_MAKERS_LIST', {
            teamId: teamId,
            lat: latitude,
            lng: longitude
          });
          // navigation.navigate('P_MAKERS_LIST', {
          //   teamId: teamId,
          //   lat: latitude,
          //   lng: longitude
          // });
        }}
      >
        {isMakers ? (
          <MakersInfoBox>
            <FastImage
              source={makers?.image ? { uri: makers.image } : require('../../assets/images/default.png')}
              style={{ width: 42, height: 42, marginRight: 8 }}
              resizeMode="cover"
            />
            <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
              {makers?.name}
            </Typography>
          </MakersInfoBox>
        ) : (
          <MakersInfoBox>
            <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
              메이커스를 선택해 주세요
            </Typography>
          </MakersInfoBox>
        )}
        <GoOrderView>
          <Typography text="Button10R" textColor={themeApp.colors.gray[4]}>
            {isMakers ? '주문하러가기' : '메이커스 선택'}
          </Typography>
          <FastImage
            source={require('../../assets/images/arrow-right.png')}
            style={{ width: 14, height: 14, marginLeft: 2 }}
          />
        </GoOrderView>
      </SelectMakers>
    </Container >
  );
};

export default Component;

const Container = styled.View`
  padding: 24px;
  background-color: white;
`;
const SelectMakers = styled.Pressable`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;
const MakersInfoBox = styled.View`
  height: 42px;
  flex-direction: row;
`;
const GoOrderView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
`;
