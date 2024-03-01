import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typography from '../../../components/Typography';
import FastImage from 'react-native-fast-image';

import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {tTeamDetailInfo} from '../../../utils/types/teamType';

type Member = {
  id: number;
  name: string;
};
type MemberListProps = {
  members: Member[];
  maxMember: number;
};

const MemberList = ({members, maxMember}: MemberListProps) => {
  const navigaion = useNavigation<any>();
  const themeApp = useTheme();

  return (
    <Container>
      <Wrap>
        <Typography text="CationR" textColor={themeApp.colors.gray[4]}>
          팀원
        </Typography>
        <Typography text="CationR" textColor={themeApp.colors.gray[4]}>
          {members.length}/{maxMember}
        </Typography>
      </Wrap>
      <MemberWrap>
        {members?.map(el => (
          <MemberCard key={el.id}>
            <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
              {el.name}
            </Typography>
            <Typography text="SmallLabel" textColor={themeApp.colors.gray[4]}>
              양념치킨•1개
            </Typography>
          </MemberCard>
        ))}
      </MemberWrap>
    </Container>
  );
};

export default MemberList;

const Container = styled.View`
  padding: 24px;
`;

const Wrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextBox = styled.View`
  margin-right: 86px;
`;
const ImageBox = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.gray[4]};
`;
const Description = styled.View`
  margin-top: 4px;
  margin-bottom: 8px;
`;
const MemberWrap = styled.View`
  margin-top: 8px;
`;

const MemberCard = styled.View`
  margin-bottom: 16px;
`;
