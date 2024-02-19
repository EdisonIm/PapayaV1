import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from '../pages/Complete';

const Stack = createNativeStackNavigator();

function Delivery() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{title: '완료하기'}}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
