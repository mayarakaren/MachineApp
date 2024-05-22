import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a tela em branco.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ResultScreen;
