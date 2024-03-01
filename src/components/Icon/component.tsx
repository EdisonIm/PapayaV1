import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface IComponent {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Component = ({ children, style }: IComponent) => {
  return <IconWrapper style={style}>{children}</IconWrapper>;
};

// Styling
const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default Component;
