import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typography from '../../../../../components/Typography';
import FastImage from 'react-native-fast-image';
import {tTeamInfoListItem} from '../../../../../apis/home';
const imagesUrl = 'https://cdn.imweb.me/upload/94dc5a2f83cd5.jpg';

interface IHomeTabTeamItem {
  team: tTeamInfoListItem;
}

const Component = ({team}: IHomeTabTeamItem) => {
  const themeApp = useTheme();

  return (
    <Container>
      <FastImage
        source={{uri: team.image}}
        style={{width: 64, height: 64, borderRadius: 12}}
        resizeMode="cover"
      />
      <TextContainer>
        <TextBox>
          <Typography
            style={{maxWidth: 199}}
            numberOfLines={1}
            ellipsizeMode="tail"
            text="Body05SB"
            textColor={themeApp.colors.gray[2]}>
            {team.name}
          </Typography>
        </TextBox>
        <TextBox>
          <FastImage
            source={require('../../../../../assets/images/location.png')}
            style={{width: 16, height: 16}}
          />
          <Typography
            style={{maxWidth: 179}}
            numberOfLines={1}
            ellipsizeMode="tail"
            text="CaptionR"
            textColor={themeApp.colors.gray[2]}>
            {team.makers.name}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography text="SmallLabel" textColor={themeApp.colors.gray[5]}>
            {team.localAddress}
          </Typography>
        </TextBox>
      </TextContainer>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const TextContainer = styled.View`
  margin-left: 16px;
  gap: 4px;
`;
const TextBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 199px;
  gap: 4px;
`;
