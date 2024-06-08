import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ResultScreen = () => {
  const router = useRouter();
  const { classifyData } = useLocalSearchParams();

  // Verifica se os dados de classificação existem antes de renderizar
  if (!classifyData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum dado disponível</Text>
      </View>
    );
  }

  const data = JSON.parse(classifyData);

  // Função para formatar a saída do texto
  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <Text key={index} style={styles.text}>
        {line}
      </Text>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultado</Text>
      </View>
      {formatText(data.output)}
      {data.imagem && (
        <Image
          style={styles.image}
          source={{ uri: `http://192.168.18.23:5000/${data.imagem}` }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#6495ED',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default ResultScreen;
