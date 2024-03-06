import React, { useState } from 'react';
import styled, { css, useTheme } from 'styled-components/native';
import { optionStyles, textStyles, variantStyles, weightStyles } from './styles';
import { TouchableOpacity, Text } from 'react-native';

interface ITypographyProps {
  children: React.ReactNode;
  variant?: string;
  weight?: string;
  align?: string;
  option?: string;
  text?: string;
  textColor?: string;
  lineBreakStrategyIOS?: string;
  numberOfLines?: number;
  ellipsizeMode?: string;
  maxChars?: number;
  [key: string]: any;
}

const Typography: React.FunctionComponent<ITypographyProps> = ({
  children,
  maxChars,
  lineBreakStrategyIOS,
  weight,
  align,
  variant,
  option,
  text,
  ellipsizeMode,
  textColor,
  ...props
}) => {
  console.log('렌더링: Typography');
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const themeApp = useTheme(); // Ensure useTheme is called within a ThemeProvider
  let textChild = '';

  if (typeof children === 'string') {
    textChild = children;
  }

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <StyledTypography
      lineBreakStrategyIOS={lineBreakStrategyIOS}
      weight={weight}
      align={align}
      variant={variant}
      option={option}
      text={text}
      ellipsizeMode={ellipsizeMode}
      textColor={textColor}
      {...props}
    >
      {maxChars && textChild.length > maxChars && isTruncated
        ? `${textChild.slice(0, maxChars)}...`
        : children}
      {maxChars && textChild && textChild.length > maxChars && (
        <TouchableOpacity onPress={toggleTruncate}>
          <Text
            style={{
              textDecorationLine: 'underline',
              position: 'absolute',
              bottom: -4,
              left: !isTruncated ? 5 : 0,
              color: themeApp.colors.gray[6], // Ensure this color is defined in your theme
            }}
          >
            {isTruncated ? '더보기' : '접기'}
          </Text>
        </TouchableOpacity>
      )}
    </StyledTypography>
  );
};

export default Typography;

const StyledTypography = styled.Text<ITypographyProps>`
  font-style: normal;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  ${({ variant }) => variant && variantStyles[variant]};
  ${({ option }) => option && optionStyles[option]};
  ${({ weight }) => weight && weightStyles[weight]};
  ${({ text }) => text && textStyles[text]};
  ${({ align }) => align && css`text-align: ${align};`};
  ${({ textColor, theme }) =>
    textColor &&
    css`
      color: ${textColor};
    `};
  background-color: transparent;
`;
