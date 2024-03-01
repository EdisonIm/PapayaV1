import React from 'react';
import {Text, View, Pressable} from 'react-native';

import {MainTabProps} from '../../../utils/types/navigation';
import {useMyTeamList} from '../../../hooks/team';
import {USER_ID} from '../../../config/const';

export const TAB_NAME = 'T_TEAMROOM';
const Pages = ({navigation}: MainTabProps<'T_TEAMROOM'>) => {
  const {myTeamlist} = useMyTeamList(USER_ID);
  // console.log(myTeamlist);
  return (
    <View>
      <Text>내가 가입한 팀 목록</Text>
      {myTeamlist?.map(el => {
        return (
          <Pressable
            key={el.teamId}
            style={{padding: 16}}
            onPress={() =>
              navigation.navigate('P_TEAM_INFO', {
                params: el.teamId,
              })
            }>
            <Text>{el.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Pages;
