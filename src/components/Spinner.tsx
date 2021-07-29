import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../styles';

const SpinnerComponent = () => (
  <View style={styles.centerSpinner}>
    <ActivityIndicator size="large" />
  </View>
);

export default SpinnerComponent;
