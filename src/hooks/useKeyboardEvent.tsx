import {useEffect, useState, RefObject} from 'react';
import {
  Keyboard,
  Platform,
  Dimensions,
  KeyboardEvent,
  EmitterSubscription,
} from 'react-native';

interface UseKeyboardEventProps {
  inputRef?: RefObject<any> | null;
}

interface KeyboardDimensions {
  height: number;
}

export default function useKeyboardEvent({inputRef}: UseKeyboardEventProps) {
  const [isKeyboardActivate, setIsKeyboardActivate] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [dimensions, setDimensions] = useState<KeyboardDimensions>({
    height: 0,
  });

  const keyboardWillShow = (e: KeyboardEvent) => {
    setIsKeyboardActivate(true);
    if (Platform.OS === 'ios') {
      setKeyboardHeight(
        Dimensions.get('window').height - e.endCoordinates.height,
      );
    }
  };

  const keyboardWillHide = () => {
    setIsKeyboardActivate(false);
    if (Platform.OS === 'ios') {
      setKeyboardHeight(0);
    }

    if (inputRef) {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription | null = null;
    let keyboardDidHideListener: EmitterSubscription | null = null;

    if (Platform.OS === 'android') {
      keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        keyboardWillShow,
      );
      keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        keyboardWillHide,
      );
    } else if (Platform.OS === 'ios') {
      keyboardDidShowListener = Keyboard.addListener(
        'keyboardWillShow',
        keyboardWillShow,
      );
      keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        keyboardWillHide,
      );
    }

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [inputRef]);

  return {isKeyboardActivate, keyboardHeight};
}
