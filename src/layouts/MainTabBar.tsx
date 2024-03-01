import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View, Text, Image, SafeAreaView} from 'react-native';
import HomeIcon from '~assets/icons/TabBar/home.svg';
import ActiveHomeIcon from '~assets/icons/TabBar/homeActive.svg';
import FindTeamIcon from '~assets/icons/TabBar/findTeam.svg';
import ActiveFindTeamIcon from '~assets/icons/TabBar/findTeamActive.svg';
import ActiveNewTeamIcon from '~assets/icons/TabBar/newTeamActive.svg';
import NewTeamIcon from '~assets/icons/TabBar/newTeam.svg';
import MyPageIcon from '~assets/icons/TabBar/burger.svg';
import ActiveMyPageIcon from '~assets/icons/TabBar/burgerActive.svg';
import Typography from '../components/Typography';
import {PAGE_NAME as CreateTeamPageName} from '../pages/CreateTeam';
import styled from 'styled-components/native';

const labelMap = {
  T_HOME: {label: '홈', icon: <ActiveHomeIcon />, iconGray: <HomeIcon />},
  T_SEARCHTEAM: {
    label: '팀찾기',
    icon: <ActiveFindTeamIcon />,
    iconGray: <FindTeamIcon />,
  },
  T_TEAMROOM: {
    label: '팀방',
    icon: <ActiveNewTeamIcon />,
    iconGray: <NewTeamIcon />,
  },
  T_MYPAGE: {
    label: '마이페이지',
    icon: <ActiveMyPageIcon />,
    iconGray: <MyPageIcon />,
  },
} as {[val: string]: {label: string; icon: any; iconGray: any}};

function MainTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              {isFocused
                ? labelMap[route.name].icon
                : labelMap[route.name].iconGray}
            </View>
            <Typography
              text={'SmallLabel'}
              textColor={isFocused ? '#1D1B20' : '#79767D'}>
              {labelMap[route.name].label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </TabBarContainer>
  );
}

export default MainTabBar;

const TabBarContainer = styled.View`
  height: 56px;
  flex-direction: row;
  background-color: white;
  border-top-color: ${({theme}) => theme.colors.gray[7]};
  border-top-width: 1px;
`;
