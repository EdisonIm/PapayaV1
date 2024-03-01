import React, { useState } from 'react';
import styled, { css, useTheme } from 'styled-components/native';
import { optionStyles, textStyles, variantStyles, weightStyles } from './styles';
import { TouchableOpacity, View } from 'react-native';

interface ITypograhpyProps {
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

const Component: React.FunctionComponent<ITypograhpyProps> = props => {
  const { children, maxChars } = props;
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const themeApp = useTheme();
  const textChild = props.children as string;
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <Typograhpy
      lineBreakStrategyIOS={props.lineBreakStrategyIOS}
      weight={props.weight}
      align={props.align}
      variant={props.variant}
      option={props.option}
      text={props.text}
      ellipsizeMode={props.ellipsizeMode}
      textColor={props.textColor}
      {...props}
    >
      {maxChars && textChild.length > maxChars && isTruncated
        ? `${textChild.slice(0, maxChars)}...`
        : children}
      {maxChars && textChild && textChild.length > maxChars && (
        <TouchableOpacity onPress={toggleTruncate}>
          <Typograhpy
            text={'CaptionR'}
            textColor={themeApp.colors.gray[6]}
            style={{
              textDecorationLine: 'underline',
              position: 'absolute',
              bottom: -4,
              left: !isTruncated ? 5 : 0,
            }}
          >
            {isTruncated ? '더보기' : '접기'}
          </Typograhpy>
        </TouchableOpacity>
      )}
    </Typograhpy>
  );
};

export default Component;

const Typograhpy = styled.Text<ITypograhpyProps>`
  font-style: normal;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  ${({ variant }) => variant && variantStyles[variant]};
  ${({ option }) => option && optionStyles[option]}
  ${({ weight }) => weight && weightStyles[weight]};
  ${({ text }) => text && textStyles[text]};
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ textColor }) => {
    if (!textColor) return null;

    const isNeedNotProperty = Array.isArray(textColor);
    return isNeedNotProperty
      ? css`
          ${textColor}
        `
      : css`
          color: ${textColor};
        `;
  }};
  background-color: transparent;
`;
