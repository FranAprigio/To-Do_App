// MapScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from './Map';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
