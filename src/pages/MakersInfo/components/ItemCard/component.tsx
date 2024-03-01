import React from "react";
import styled, { useTheme } from "styled-components/native";
import Typography from "../../../../components/Typography";
import FastImage from "react-native-fast-image";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootScreenPrams } from "../../../../utils/types/navigation";
import { tFoodListItem } from "../../../../utils/types/foodTyps";
import withCommas from "../../../../utils/withCommas";
const Component = ({ description, images, name, supplyPrice }: tFoodListItem) => {
  const navigaion = useNavigation<any>();
  const themeApp = useTheme();
  console.log(name)
  return (
    <Container onPress={() => navigaion.replace("P_ITEM_INFO", {
      name: name,
      description: description,
      supplyPrice: supplyPrice,
      images: images
    })}>
      <TextBox>
        <Typography text="Title04SB" textColor={themeApp.colors.gray[2]}>{name}</Typography>
        <Description>
          <Typography numberOfLines={2} ellipsizeMode="tail" text="CaptionR" textColor={themeApp.colors.gray[4]}>{description}</Typography>
        </Description>
        <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>{withCommas(supplyPrice)}원</Typography>
      </TextBox>
      <ImageBox>
        {images && <FastImage source={{ uri: images[0] }} style={{ width: 70, height: 70 }} />}
      </ImageBox>
    </Container>
  )
}

export default Component;

const Container = styled.Pressable`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[8]};
`

const TextBox = styled.View`
  margin-right: 86px;
  
`
const ImageBox = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[4]};
`
const Description = styled.View`
  margin-top: 4px;
  margin-bottom: 8px;
`