import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { RootStackProps } from '../../utils/types/navigation';
import Header from '../../layouts/Header';
import MakersCard from './MakersCard';
import styled from 'styled-components/native';
import { useTeamMakersList, useTeamSelectMakers } from '../../hooks/team';
import { USER_ID } from '../../config/const';

export const PAGE_NAME = 'P_MAKERS_LIST';

const Pages = ({ route, navigation }: RootStackProps<'P_MAKERS_LIST'>) => {
  const { lat, lng, teamId } = route.params;
  const { myTeamMakerslist } = useTeamMakersList(lat, lng);
  const { mutateAsync: selectMakers } = useTeamSelectMakers();
  const handleSelectMakers = async (id: number) => {
    console.log(id, teamId);
    try {
      await selectMakers({
        makersId: id,
        teamId: teamId,
        userId: USER_ID,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error?.toString());
    }
  };
  return (
    <Conatiner>
      <Header back label="메이커스 목록" />
      <ContentsBox>
        <FlatList
          data={myTeamMakerslist}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <MakersCard
                key={item.id}
                {...item}
                onPress={() => handleSelectMakers(item.id)}
              />
            );
          }}
        />
      </ContentsBox>
    </Conatiner>
  );
};

export default Pages;

const Conatiner = styled.View`
  flex: 1;
  background-color: white;
`;
const ContentsBox = styled.View`
  padding: 24px;
`;
