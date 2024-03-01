import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootScreenPrams = {
  S_LOGIN: {screen: keyof LoginStackParam; params?: any};
  S_MAIN: {screen: keyof MainTabParam; params?: any};
  P_CREATETEAM: undefined;
  P_SEARCH_ADDRESS: undefined;
  P_TEAMINPUT: {};
  P_MAKERS_LIST: {lat: number; lng: number; teamId: number};
  P_MAKERS_INFO: {id: number; storeName: string; image?: string};
  P_ITEM_INFO: {
    name: string;
    description: string;
    supplyPrice: number;
    images: Array<string>;
  };
  P_TEAM_INFO: {params?: any};
};
type RootStackRouteProp<T extends keyof RootScreenPrams> = RouteProp<
  RootScreenPrams,
  T
>;
type RootNativeStackNavigationProp<T extends keyof RootScreenPrams> =
  T extends 'S_MAIN'
    ? BottomTabNavigationProp<RootScreenPrams, T>
    : NativeStackNavigationProp<RootScreenPrams, T>;

export type RootStackProps<T extends keyof RootScreenPrams> = {
  route: RootStackRouteProp<T>;
  navigation: RootNativeStackNavigationProp<T>;
};

export type LoginStackParam = {
  P_LOGIN: undefined;
};
type LoginStackRouteProp<T extends keyof LoginStackParam> = RouteProp<
  LoginStackParam,
  T
>;
type LoginNativeStackNavigationProps<T extends keyof LoginStackParam> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootScreenPrams, 'S_LOGIN'>,
    NativeStackNavigationProp<LoginStackParam, T>
  >;
export type LoginStackProps<T extends keyof LoginStackParam> = {
  route: LoginStackRouteProp<T>;
  navigation: LoginNativeStackNavigationProps<T>;
};

export type MainTabParam = {
  T_HOME: undefined;
  T_SEARCHTEAM: undefined;
  T_TEAMROOM: undefined;
  T_MYPAGE: undefined;
};

type MainTabRouteProp<T extends keyof MainTabParam> = RouteProp<
  MainTabParam,
  T
>;
type MainTabNavigationProp<T extends keyof MainTabParam> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootScreenPrams, 'S_MAIN'>,
    NativeStackNavigationProp<MainTabParam, T>
  >;

export type MainTabProps<T extends keyof MainTabParam> = {
  route: MainTabRouteProp<T>;
  navigation: MainTabNavigationProp<T>;
};
