import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UserProfile from '../../UserProfile/UserProfile';

const MyPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Page</Text>
      {/* UserProfile 컴포넌트를 사용하여 렌더링 */}
      <UserProfile />
      {/* 여기에 MyPage의 다른 컴포넌트나 기능을 추가할 수 있습니다 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default MyPage;
