import React from 'react';
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
import styled, {useTheme} from 'styled-components/native';

const labelMap = {
  UserProfile: { label: '사용자 프로필', icon: <HomeIcon />, iconGray: <ActiveHomeIcon /> },
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

// MainTabBar 컴포넌트 정의
function MainTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  console.log('렌더링: MainTabBar');
  const theme = useTheme(); // theme 사용

  return (
    <TabBarContainer theme={theme}> {/* theme 전달 */}
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // 현재 라우트 이름에 해당하는 아이콘 데이터 가져오기
        const iconData = labelMap[route.name];
        if (!iconData) {
          console.error(`No icon data found for route name: ${route.name}`);
          return null; // 또는 기본 아이콘을 반환
        }


        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              {isFocused ? iconData.icon : iconData.iconGray}
            </View>
            <Typography
              text="SmallLabel"
              textColor={isFocused ? theme.colors.primary : theme.colors.secondary}>
              {iconData.label}
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
  border-top-color: ${({ theme }) => theme.colors.gray[7]};
  border-top-width: 1px;
`;
