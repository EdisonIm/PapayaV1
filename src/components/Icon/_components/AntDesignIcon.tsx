import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'styled-components/native';

import IconWrapper from '../component';

interface IIconProps {
  name: string;
  size?: number;
  color?: string;
}

const Component = ({name, size = 16, color}: IIconProps) => {
  const appTheme = useTheme();
  return (
    <IconWrapper>
      <AntDesignIcon
        name={name}
        size={size}
        color={color || appTheme.colors.gray[3]}
      />
    </IconWrapper>
  );
};
export default Component;
