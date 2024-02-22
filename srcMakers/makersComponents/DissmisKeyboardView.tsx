import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

interface DismissKeyboardViewProps {
  children: React.ReactNode; // children의 타입을 React.ReactNode로 명시
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
