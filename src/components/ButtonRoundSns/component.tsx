import React from 'react';
import styled, {css} from 'styled-components/native';

import {AppleSnsIcon, KakaoSnsIcon} from '../Icon';

interface ISnsButtonProps {
  typeSns?: 'kakao' | 'apple';
  size?: string;
  mr?: string;
  onPressEvent?: () => void;
}

const Component = ({
  typeSns,
  size,
  mr,
  onPressEvent = () => {
    console.log('sns 라운드 버튼을 누르셨습니다.');
  },
}: ISnsButtonProps) => {
  const renderButton = () => {
    switch (typeSns) {
      case 'apple':
        return <AppleSnsIcon />;
      case 'kakao':
        return <KakaoSnsIcon />;
    }
  };

  return (
    <ButtonWrap onPress={onPressEvent} size={size} mr={mr}>
      <IconWrap>{renderButton()}</IconWrap>
    </ButtonWrap>
  );
};

export default Component;

const ButtonWrap = styled.Pressable<ISnsButtonProps>`
  width: ${({size}) => size + 'px'};
  border-radius: 50px;
  height: ${({size}) => size + 'px'};
  ${({mr}) => {
    if (mr) {
      return css`
        margin: ${mr};
      `;
    }
  }}
`;
const IconWrap = styled.View`
  align-items: center;
  justify-content: center;
`;
