import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typography from '../../../../../components/Typography';
import FastImage from 'react-native-fast-image';
import HomeTabTeamItem from '../HomeTabTeamItem';
import {tTeamInfoListItem} from '../../../../../apis/home';

interface IHomeTabTeamListBoxProps {
  teamList: Array<tTeamInfoListItem>;
}

const Component = ({teamList}: IHomeTabTeamListBoxProps) => {
  const themeApp = useTheme();
  return (
    <Container>
      <MakersListBox>
        {teamList.map(team => {
          return <HomeTabTeamItem key={team.id} team={team} />;
        })}
      </MakersListBox>
      <MoreMakersButton>
        <Typography text="Button10R" textColor={themeApp.colors.gray[4]}>
          내 주변 팀 더 보기
        </Typography>
        <FastImage
          source={require('../../../../../assets/images/arrow-right.png')}
          tintColor={themeApp.colors.gray[4]}
          style={{width: 14, height: 14}}
        />
      </MoreMakersButton>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.colors.gray[7]};
`;
const MakersListBox = styled.View`
  padding-vertical: 24px;
  margin-horizontal: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.gray[8]};
  gap: 16px;
`;

const MoreMakersButton = styled.Pressable`
  padding-vertical: 16px;
  padding-left: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;
