import React, { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import { RootStackProps } from '../../utils/types/navigation';
import Header from '../../layouts/Header';
import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../components/Typography';
import HorizontalLine from '../../components/HorizontalLine';
import ItemCard from './components/ItemCard';
import { useGetFoodItemList } from '../../hooks/item';


export const PAGE_NAME = 'P_MAKERS_INFO';

const Pages = ({ route, navigation }: RootStackProps<"P_MAKERS_INFO">) => {
  const { id, image, storeName } = route.params;
  const [isTransparent, setTransparent] = useState<boolean>(true);

  const { foodItemList } = useGetFoodItemList(id)
  const themeApp = useTheme();
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent
    if (contentOffset.y < 280 - 48) {
      setTransparent(true)
    } else {
      if (isTransparent)
        setTransparent(false)
    }
  }
  console.log(foodItemList)
  return (
    <Outer>
      <PositionBox>
        <Header back isTransparent={isTransparent} border={false} label={isTransparent ? "" : "반올림피자샵 신당역점"} />
      </PositionBox>
      <Conatiner onScroll={onScroll}>
        <GradiantCover colors={['#00000073', '#1D1B2000']}></GradiantCover>
        <FastImage
          source={{ uri: image ? image : "data:image/jpeg;base64,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" }}
          style={{
            position: 'absolute',
            width: '100%',
            height: 280
          }}
        />
        <ContentsTopBox>
          <Typography text='Title02SB' textColor={themeApp.colors.gray[2]}>{storeName}</Typography>
          <StartInfo>
            <FastImage source={require("../../assets/images/star.png")} style={{ width: 24, height: 24, marginRight: 4 }} resizeMode='contain' />
            <Typography text='Body05SB' textColor={themeApp.colors.gray[2]}>4.5</Typography>
          </StartInfo>
        </ContentsTopBox>
        <HorizontalLine height={8} />
        <ContentsBox>
          {foodItemList?.map((item) => {
            return <ItemCard key={item.id} {...item} />
          })}
        </ContentsBox>
      </Conatiner>
    </Outer>
  );
};

export default Pages;

const Conatiner = styled.ScrollView`
  flex:1;
  background-color: white;
  margin-bottom: 40px;
`
const Outer = styled.View`
  flex:1;
  background-color: white;
`
const ContentsTopBox = styled.View`
  margin-top: 280px;
  padding: 24px;
`
const ContentsBox = styled.View`
  padding: 24px;
`
const PositionBox = styled.View`
  position: absolute;
  top:0;
  width: 100%;
  z-index: 99;
`
const GradiantCover = styled(LinearGradient)`
  width: 100%;
  height: 140px;
  position: absolute;
  z-index: 98;
`
const StartInfo = styled.View`
  margin-top: 8px;
  flex-direction: row;
`