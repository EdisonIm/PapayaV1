import React from 'react';
import { useTheme } from 'styled-components/native';
import ActMinus from "../../../assets/icons/ActMinus.svg"
import Minus from "../../../assets/icons/Minus.svg"

import IconWrapper from '../component';

interface IIconProps {
  active?: boolean;
}

const Component = ({ active }: IIconProps) => {
  const appTheme = useTheme();
  return (
    <IconWrapper>
      {active ? <ActMinus /> : <Minus />}
    </IconWrapper>
  );
};
export default Component;
