import * as React from 'react';
import Home, {TAB_NAME as HomePageName} from '../../pages/MainTab/Home';
import SearchTeam, {
  TAB_NAME as SearchTeamPageName,
} from '../../pages/MainTab/SearchTeam';
import TeamInfo, {
  TAB_NAME as TeamInfoPageName,
} from '../../pages/MainTab/TeamRoom';
import MyPage, {TAB_NAME as MyPageName} from '../../pages/MainTab/MyPage';
import {MainTabParam} from '../../utils/types/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabBar from '../../layouts/MainTabBar';
import Config from 'react-native-config';
const MainRoot = createBottomTabNavigator<MainTabParam>();

export const SCREEN_NAME = 'S_MAIN';

export default function MainScreen() {
  return (
    <MainRoot.Navigator
      initialRouteName={HomePageName}
      tabBar={props => <MainTabBar {...props} />}
    >
      <MainRoot.Group screenOptions={{headerShown: false}}>
        <MainRoot.Screen name={HomePageName} component={Home} />
        <MainRoot.Screen name={SearchTeamPageName} component={SearchTeam} />
        <MainRoot.Screen name={TeamInfoPageName} component={TeamInfo} />
        <MainRoot.Screen name={MyPageName} component={MyPage} />
      </MainRoot.Group>
    </MainRoot.Navigator>
  );
}
