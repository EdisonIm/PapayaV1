import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {PAGE_NAME as CreateTeamPageName} from '../../CreateTeam';
import {MainTabProps} from '../../../utils/types/navigation';
import Typography from '../../../components/Typography';
import styled, {useTheme} from 'styled-components/native';
import Header from '../../../layouts/Header';
import FastImage from 'react-native-fast-image';
import HomeTabTeamListBox from './components/HomeTabTeamListBox';
import {useHomeTeamList} from '../../../hooks/team';
import Fab from '../../../components/Fab';

export interface IPageProps {
  route: any;
}

export const TAB_NAME = 'T_HOME';
const Pages = ({route, navigation}: MainTabProps<'T_HOME'>) => {
  const params = route.params;
  const themeApp = useTheme();
  console.log(params);
  const {teamList} = useHomeTeamList();
  const goToCreateTeamPage = () => {
    navigation.navigate('P_CREATETEAM');
  };

  return (
    <Container>
      <Header
        back={false}
        actions={
          <HeaderActionView>
            <HeaderAction>
              <FastImage
                source={require('../../../assets/images/alarm.png')}
                style={{width: 24, height: 24}}
              />
            </HeaderAction>
            <HeaderAction>
              <FastImage
                source={require('../../../assets/images/cs.png')}
                style={{width: 24, height: 24}}
              />
            </HeaderAction>
          </HeaderActionView>
        }
      />
      <Contents>
        <Typography text="Title02SB" textColor={themeApp.colors.gray[2]}>
          내 주변
        </Typography>
        {teamList && <HomeTabTeamListBox teamList={teamList} />}
      </Contents>
      <Fab
        buttonColor="black"
        iconTextColor="#FFFFFF"
        iconTextComponent={
          <FastImage
            source={require('~assets/images/iconmonstr-plus-lined-240.png')}
            style={{width: 36, height: 36}}
            tintColor={'#fff'}
            resizeMode="cover"
          />
        }
        onClickAction={goToCreateTeamPage}
      />
    </Container>
  );
};

export default Pages;

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const HeaderAction = styled.Pressable`
  width: 48px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
`;
const HeaderActionView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

const Contents = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  margin-top: 40px;
  gap: 24px;
`;
