import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen, {SCREEN_NAME as LoginScreenName} from './Login';
import MainScreen, {SCREEN_NAME as MainScreenName} from './Main';
import CreateTeamPage, {
  PAGE_NAME as CreateTeamPageName,
} from '../pages/CreateTeam';
import MakersList, {PAGE_NAME as MakersListPageName} from '../pages/MakersList';
import MakersInfo, {PAGE_NAME as MakersInfoPageName} from '../pages/MakersInfo';
import ItemInfo, {PAGE_NAME as ItemInfoPageName} from '../pages/ItemInfo';
import TeamInputPage, {
  PAGE_NAME as TeamInputPageName,
} from '../pages/CreateTeam/components/TeamInput';
import SearchAddressPage, {
  PAGE_NAME as SearchAddressPageName,
} from '../pages/MainTab/SearchTeam/components/Search';
import {RootScreenPrams} from '../utils/types/navigation';
import TeamInfo, {PAGE_NAME as TeamInfoPageName} from '../pages/TeamInfo';
const Root = createNativeStackNavigator<RootScreenPrams>();
const Screen = () => {
  return (
    <Root.Navigator initialRouteName={MainScreenName}>
      <Root.Group screenOptions={{headerShown: false}}>
        <Root.Screen name={LoginScreenName} component={LoginScreen} />
        <Root.Screen name={MainScreenName} component={MainScreen} />
        <Root.Screen name={CreateTeamPageName} component={CreateTeamPage} />
        <Root.Screen name={TeamInputPageName} component={TeamInputPage} />
        <Root.Screen
          name={SearchAddressPageName}
          component={SearchAddressPage}
          options={{
            animation: 'simple_push',
          }}
        />
        <Root.Screen name={MakersListPageName} component={MakersList} />
        <Root.Screen name={MakersInfoPageName} component={MakersInfo} />
        <Root.Screen name={ItemInfoPageName} component={ItemInfo} />
        <Root.Screen name={TeamInfoPageName} component={TeamInfo} />
      </Root.Group>
    </Root.Navigator>
  );
};
export default Screen;
