import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';

function MakersSettings() {
  const revenue = useSelector((state: RootState) => state.makersUser.revenue); // 수익금
  const companyName = useSelector(
    (state: RootState) => state.makersUser.companyName,
  ); // 사업자등록증상(메이커스) 이름

  return (
    <View>
      <View style={styles.revenue}>
        <Text style={styles.revenueText}>
          {companyName}님의 수익금{' '}
          <Text style={{fontWeight: 'bold'}}>
            {revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          원
        </Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={() => Alert.alert('알림', '로그아웃 되었습니다.')}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  revenue: {
    padding: 20,
  },
  revenueText: {
    fontSize: 16,
  },
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MakersSettings;
