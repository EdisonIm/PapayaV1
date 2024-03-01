import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled, {useTheme} from 'styled-components/native';
import {css} from 'styled-components';
import Typography from '../components/Typography';
import {Image} from 'react-native';

type Props = {
  label?: string;
  back?: boolean;
  actions?: React.ReactNode;
  border?: boolean;
  isTransparent?: boolean;
};

const Header: React.FC<Props> = ({
  label,
  back = true,
  actions,
  border = true,
  isTransparent = false,
}) => {
  const navigation = useNavigation<any>();
  const themeApp = useTheme();
  return (
    <Container border={border} trans={isTransparent}>
      <Box align="flex-start">
        {back && (
          <BackButton onPress={navigation.goBack}>
            <Image
              style={{width: 24, height: 24}}
              source={
                isTransparent
                  ? require('~assets/images/arrow-left-white.png')
                  : require('~assets/images/arrow-left.png')
              }
              alt="뒤로"
              resizeMode="contain"
            />
          </BackButton>
        )}
      </Box>
      <TypoWrap back={back}>
        <Typography text="Title04SB" textColor={themeApp.colors.gray[2]}>
          {label}
        </Typography>
      </TypoWrap>
      <ActionBox align="flex-end">{actions}</ActionBox>
    </Container>
  );
};

export default memo(Header);

const Container = styled.View<{border: boolean; trans: boolean}>`
  height: 48px;
  width: 100%;
  ${({trans, theme}) => {
    if (trans) {
      return css`
        background-color: transparent;
      `;
    } else {
      return css`
        background-color: ${theme.colors.gray[0]};
      `;
    }
  }}

  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 12px;
  ${({border, theme}) => {
    if (border) {
      return css`
        border-bottom-width: 1px;
        border-bottom-color: ${({theme}) => theme.colors.gray[8]};
      `;
    }
  }}
`;
const Box = styled.View<{align?: string}>`
  ${({align}) => {
    if (align) {
      return css`
        align-items: align;
      `;
    }
  }}
`;
const ActionBox = styled.View<{align?: string}>`
  flex: 1;
  ${({align}) => {
    if (align) {
      return css`
        align-items: align;
      `;
    }
  }}
`;
const BackButton = styled.Pressable`
  padding: 8px;
`;

const TypoWrap = styled.View<Props>`
  padding-left: ${({back}) => (!back ? '12px' : '0px')};
`;
