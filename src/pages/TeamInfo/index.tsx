import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import MakersInfo from '../../components/MakersInfo';
import {MainTabProps, RootStackProps} from '../../utils/types/navigation';
import Header from '../../layouts/Header';
import styled, {useTheme} from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Typography from '../../components/Typography';
import LocationIcon from '~assets/icons/Team/locationMark.svg';
import TimeIcon from '~assets/icons/Team/timeCircle.svg';
import {useTeamRoomDetail} from '../../hooks/team';
import HorizontalLine from '../../components/HorizontalLine';
import MemberList from './components/MemberList';
import {tMakers} from '../../utils/types/teamType';
export const PAGE_NAME = 'P_TEAM_INFO';

const Pages = ({route, navigation}: RootStackProps<'P_TEAM_INFO'>) => {
  const params = route.params;
  const themeApp = useTheme();
  const [isMakers, setMakers] = useState<boolean>(false);

  const {teamDetail} = useTeamRoomDetail(params.params);
  // console.log(teamDetail);
  return (
    <Wrap>
      <Header label="팀 정보" border={false} />
      <Contatiner>
        <Contents>
          <FastImage
            source={{
              uri: teamDetail?.image,
            }}
            style={{
              width: '100%',
              height: 192,
              borderRadius: 12,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />
          <TypoWrap>
            <Typography text="Title02SB" textColor={themeApp.colors.gray[2]}>
              {teamDetail?.name}
            </Typography>
          </TypoWrap>
          <TypoWrap>
            <IconWrap>
              <LocationIcon />
            </IconWrap>
            <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
              {teamDetail?.roadNameAddress}
            </Typography>
          </TypoWrap>
          <TypoWrap>
            <IconWrap>
              <TimeIcon />
            </IconWrap>
            <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
              {teamDetail?.dateAndTime}
            </Typography>
          </TypoWrap>
        </Contents>
        <MakersInfo
          isMakers={teamDetail?.makers !== null}
          makers={teamDetail?.makers as tMakers}
          teamId={teamDetail?.id as number}
          latitude={teamDetail?.latitude as number}
          longitude={teamDetail?.longitude as number}
        />
        <HorizontalLine height={8} />
        {teamDetail?.members && (
          <MemberList
            members={teamDetail?.members}
            maxMember={teamDetail?.maxMember}
          />
        )}
      </Contatiner>
      <ButtonContainer>
        <CreateButton onPress={() => console.log('dd')}>
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
`;

const Contatiner = styled.ScrollView`
  margin-bottom: 100px;
`;

const Contents = styled.View`
  margin: 32px 24px 0px 24px;
`;
const TypoWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 4px;
`;
const IconWrap = styled.View`
  padding-right: 4px;
`;

const MemberWrap = styled.View`
  padding: 24px;
`;
const CreateButton = styled.Pressable`
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
  position: absolute;
  bottom: 40px;
  padding-left: 24px;
  padding-right: 24px;
`;
