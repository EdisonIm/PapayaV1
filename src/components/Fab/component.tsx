import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import Touchable from './Touchable';

interface FABProps {
  buttonColor?: string;
  iconTextColor?: string;
  onClickAction?: () => void;
  iconTextComponent?: React.ReactNode;
  visible?: boolean;
  snackOffset?: number;
  style?: React.CSSProperties | React.CSSProperties[];
}

const sharpEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 0.6, 1),
};

const durationValues = {
  entry: 225,
  exit: 195,
};

const moveEasingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};

const styles = StyleSheet.create({
  addButton: {
    borderRadius: 50,
    alignItems: 'stretch',
    // shadowColor: '#000000',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 0,
    // },
    elevation: 2,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 17,
    right: 17,
    height: 62,
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  addButtonInnerContainer: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Component: React.FC<FABProps> = ({
  buttonColor = 'red',
  iconTextColor = '#FFFFFF',
  onClickAction = () => { },
  iconTextComponent = <Text>+</Text>,
  visible = true,
  snackOffset = 0,
  style = {},
}: FABProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const shiftValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateValue.setValue(1);
    } else {
      translateValue.setValue(0);
    }

    if (snackOffset === 0) {
      shiftValue.setValue(20);
    } else {
      shiftValue.setValue(20 + snackOffset);
    }
  }, [visible, snackOffset, translateValue, shiftValue]);

  useEffect(() => {
    const handleAnimation = () => {
      const animationConfig = {
        useNativeDriver: false,
      };

      if (visible) {
        Animated.timing(translateValue, {
          duration: durationValues.entry,
          toValue: 1,
          easing: sharpEasingValues.entry,
          ...animationConfig,
        }).start();
      } else {
        Animated.timing(translateValue, {
          duration: durationValues.exit,
          toValue: 0,
          easing: sharpEasingValues.exit,
          ...animationConfig,
        }).start();
      }

      if (snackOffset === 0) {
        Animated.timing(shiftValue, {
          duration: durationValues.exit,
          toValue: 20,
          easing: moveEasingValues.exit,
          ...animationConfig,
        }).start();
      } else {
        Animated.timing(shiftValue, {
          duration: durationValues.entry,
          toValue: 20 + snackOffset,
          easing: moveEasingValues.entry,
          ...animationConfig,
        }).start();
      }
    };

    handleAnimation();
  }, [visible, snackOffset, translateValue, shiftValue]);

  const dimensionInterpolate = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  });

  const rotateInterpolate = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.fabContainer, { bottom: shiftValue }]}>
      <Animated.View
        style={[
          styles.addButton, {
            height: dimensionInterpolate,
            width: dimensionInterpolate,
          },
        ]}
      >
        <Touchable
          onPress={onClickAction}
          style={[styles.addButtonInnerContainer, style]}
          buttonColor={buttonColor}
        >
          <Animated.View
            style={{
              transform: [
                { scaleX: translateValue },
                { rotate: rotateInterpolate },
              ],
            }}
          >
            {iconTextComponent}
          </Animated.View>
        </Touchable>
      </Animated.View>
    </Animated.View>
  );
};

export default Component;
