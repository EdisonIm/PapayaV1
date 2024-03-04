import React from 'react';
import ActPlus from '../../../assets/icons/ActPlus.svg';
import Plus from '../../../assets/icons/Plus.svg';

import IconWrapper from '../component';

interface IIconProps {
  active?: boolean;
}

const Component = ({active}: IIconProps) => {
  return <IconWrapper>{active ? <ActPlus /> : <Plus />}</IconWrapper>;
};
export default Component;
