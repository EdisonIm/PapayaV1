// NavigationService.ts 파일
import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
import {RootStackParamList} from '../../AppInner';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}
