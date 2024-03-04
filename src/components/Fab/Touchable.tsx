import React, {ReactNode} from 'react';
import {View, TouchableNativeFeedback, Pressable} from 'react-native';
import {IS_ANDROID, IS_LT_LOLLIPOP} from './utils';
import {StyleProps} from 'react-native-reanimated';

interface ITouchableProps {
  onPress: () => void;
  style: StyleProps;
  buttonColor: string;
  children: ReactNode;
}
const Touchable = ({
  onPress,
  style,
  buttonColor,
  children,
}: ITouchableProps) => {
  if (IS_ANDROID && !IS_LT_LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={onPress}>
        <View
          style={[
            style,
            {
              backgroundColor: buttonColor,
            },
          ]}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: buttonColor,
        },
      ]}>
      {children}
    </Pressable>
  );
};

export default Touchable;
