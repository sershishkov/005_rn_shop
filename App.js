import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>New App!!!</Text>
      </View>
    </Provider>
  );
}
