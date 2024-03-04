import React from 'react';
import styled from 'styled-components/native';

const Component = ({height}: {height: number}) => {
  return <Container height={height} />;
};
export default Component;
const Container = styled.View<{height: number}>`
  height: ${({height}) => `${height}px`};
  background-color: ${({theme}) => theme.colors.gray[8]};
`;
