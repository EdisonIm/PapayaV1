declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {ViewProps} from 'react-native';

  interface KeyboardAwareScrollViewProps extends ViewProps {
    // KeyboardAwareScrollView에 필요한 추가 props를 여기에 정의
  }

  // KeyboardAwareScrollViewComponent 클래스를 직접 확장하여 사용
  export class KeyboardAwareScrollView extends React.Component<KeyboardAwareScrollViewProps> {}
}
