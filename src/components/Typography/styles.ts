import {css} from 'styled-components/native';
import {RuleSet} from 'styled-components/native/dist/types';

export const weightStyles: Record<string, RuleSet<object>> = {
  B: css`
    font-weight: 700;
  `,
  M: css`
    font-weight: 500;
  `,
  R: css`
    font-weight: 400;
  `,
  N: css`
    font-weight: 600;
  `,
};

export const optionStyles: Record<string, RuleSet<object>> = {
  longform: css`
    line-height: 22px;
  `,
  underline: css`
    text-decoration-line: underline;
  `,
};

export const variantStyles: Record<string, RuleSet<object>> = {
  h900: css`
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    letter-spacing: -0.05px;
  `,

  h800: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.025px;
  `,

  h700: css`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  `,

  h600: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  `,

  h500: css`
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  `,

  h400: css`
    font-weight: 400;
    font-size: 10px;
    line-height: 16px;
  `,

  h300: css`
    font-weight: 400;
    font-size: 9px;
    line-height: 12px;
  `,
};

export const textStyles: Record<string, RuleSet<object>> = {
  LargeTitle: css`
    font-size: 26px;
    line-height: 35px;
    font-family: 'Pretendard-SemiBold';
  `,
  Title02R: css`
    font-size: 22px;
    line-height: 30px;
    font-family: 'Pretendard-Regular';
  `,
  Title02SB: css`
    font-size: 22px;
    line-height: 30px;
    font-family: 'Pretendard-SemiBold';
  `,
  Title03R: css`
    font-size: 20px;
    line-height: 28px;
    font-family: 'Pretendard-Regular';
  `,
  Title03SB: css`
    font-size: 20px;
    line-height: 28px;
    font-family: 'Pretendard-SemiBold';
  `,
  Title04R: css`
    font-size: 18px;
    line-height: 24px;
    font-family: 'Pretendard-Regular';
  `,
  Title04SB: css`
    font-size: 18px;
    line-height: 24px;
    font-family: 'Pretendard-SemiBold';
  `,
  Body05R: css`
    font-size: 16px;
    line-height: 22px;
    font-family: 'Pretendard-Regular';
  `,
  Body05SB: css`
    font-size: 16px;
    line-height: 22px;
    font-family: 'Pretendard-SemiBold';
  `,
  Body06R: css`
    font-size: 14px;
    line-height: 22px;
    font-family: 'Pretendard-Regular';
  `,
  Body06SB: css`
    font-size: 14px;
    line-height: 22px;
    font-family: 'Pretendard-SemiBold';
  `,
  CaptionR: css`
    font-size: 13px;
    line-height: 20px;
    font-family: 'Pretendard-Regular';
    letter-spacing: -0.3px;
  `,
  CaptionSB: css`
    font-size: 13px;
    line-height: 20px;
    font-family: 'Pretendard-SemiBold';
    letter-spacing: -0.3px;
  `,
  BottomButtonR: css`
    font-size: 17px;
    line-height: 22px;
    font-family: 'Pretendard-Regular';
  `,
  BottomButtonSB: css`
    font-size: 17px;
    line-height: 22px;
    font-family: 'Pretendard-SemiBold';
  `,
  Button09R: css`
    font-size: 15px;
    line-height: 22px;
    font-family: 'Pretendard-Regular';
  `,
  Button09SB: css`
    font-size: 15px;
    line-height: 22px;
    font-family: 'Pretendard-SemiBold';
  `,
  Button10R: css`
    font-size: 13px;
    line-height: 20px;
    font-family: 'Pretendard-Regular';
  `,
  Button10SB: css`
    font-size: 13px;
    line-height: 20px;
    font-family: 'Pretendard-SemiBold';
  `,
  MediumLabel: css`
    font-size: 14px;
    line-height: 22px;
    font-family: 'Pretendard-SemiBold';
  `,
  SmallLabel: css`
    font-size: 12px;
    line-height: 14px;
    font-family: 'Pretendard-Regular';
    letter-spacing: -0.5px;
  `,
};
