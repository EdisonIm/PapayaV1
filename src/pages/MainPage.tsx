// MainPage.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type MainPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const MainPage: React.FC<MainPageProps> = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/foodiesfeed.com_cheeseburger.jpg')}
      resizeMode="cover" // 'cover'는 이미지가 잘리지 않도록 합니다.
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.title}>
          즐겁고 부담없는 식사,{'\n'}Welcome to Papaya!
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.personal]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>개인회원 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.corporate]}
          onPress={() => navigation.navigate('MakersLogin')}>
          <Text style={styles.buttonText}>메이커스 로그인</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 이미지 위에 어두운 오버레이 추가
  },
  title: {
    fontSize: 33,
    marginTop: 50,
    marginBottom: 340,
    fontWeight: 'bold',
    color: '#fff', // 제목 색상을 흰색으로 변경
  },
  buttonZone: {
    width: '80%',
    marginTop: 100, // 버튼을 아래로 내림
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  personal: {
    backgroundColor: '#4e9af1',
  },
  corporate: {
    backgroundColor: '#f19a4e',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainPage;
