import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Components/Header';
import TabBar from './Components/Tabbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5CEE0',
    justifyContent: 'center',
  },
});
