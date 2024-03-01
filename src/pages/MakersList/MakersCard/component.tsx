import React from "react";
import FastImage from "react-native-fast-image";
import styled, { useTheme } from "styled-components/native";
import Typography from "../../../components/Typography";
import { tTeamMakers } from "../../../utils/types/teamType";

const Component = ({ storeName, image, onPress }: tTeamMakers & { onPress: () => void }) => {
  const themeApp = useTheme();
  return <Conateiner onPress={onPress}>
    <FastImage
      source={image ? { uri: image } : require("~assets/images/food-default.png")}
      style={{
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
      }}
    />
    <TextBox>
      <Typography text="Body05SB" textColor={themeApp.colors.gray[2]}>{storeName}</Typography>
      <StarBox>
        <FastImage source={require("~assets/images/star.png")} style={{ width: 16, height: 16, marginRight: 4 }} />
        <Typography text="Body07R" textColor={themeApp.colors.gray[2]}>4.5</Typography>
      </StarBox>
    </TextBox>
  </Conateiner>
}

export default Component;

const Conateiner = styled.Pressable`
  padding-bottom: 17px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[8]};
  border-bottom-width: 1px;
  flex-direction: row;
  background-color: white;
  margin-bottom: 16px;
`

const TextBox = styled.View`
  flex:1;
  width:100%;
`
const StarBox = styled.View`
  flex-direction: row;
  align-items: center;
`