import React from 'react';
import ActMinus from '../../../assets/icons/ActMinus.svg';
import Minus from '../../../assets/icons/Minus.svg';

import IconWrapper from '../component';

interface IIconProps {
  active?: boolean;
}

const Component = ({active}: IIconProps) => {
  return <IconWrapper>{active ? <ActMinus /> : <Minus />}</IconWrapper>;
};
export default Component;
