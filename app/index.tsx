import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [dataset, setDataset] = useState(null);
  const [algorithm, setAlgorithm] = useState('knn'); // Default to 'knn'
  const [loading, setLoading] = useState(false);
  const [baseLoaded, setBaseLoaded] = useState(false);
  const router = useRouter();

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      console.log('DocumentPicker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { name, uri } = result.assets[0];

        // Simulate a valid server file path
        const simulatedFilePath = `bases/iris.data`; // Simulando um caminho válido no servidor

        setDataset({ name, uri: simulatedFilePath });
        await AsyncStorage.setItem('dataset', JSON.stringify({ name, uri: simulatedFilePath }));
        setBaseLoaded(true);
        Alert.alert("Sucesso", "Base carregada com sucesso!");
      } else {
        Alert.alert("Erro", "Nenhum arquivo selecionado");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Erro", "Erro ao selecionar o arquivo");
    }
  };

  const handleExecution = async () => {
    // Check if dataset is needed for selected algorithm
    if ((algorithm === 'knn' || algorithm === 'arvore') && !dataset) {
      Alert.alert("Erro", "Por favor, selecione um conjunto de dados");
      return;
    }

    let filePath = '';

    if (algorithm === 'knn' || algorithm === 'arvore') {
      let storedDataset = await AsyncStorage.getItem('dataset');
      storedDataset = storedDataset ? JSON.parse(storedDataset) : null;

      if (!storedDataset) {
        Alert.alert("Erro", "Por favor, selecione um conjunto de dados");
        return;
      }

      filePath = storedDataset.uri;
    }

    try {
      setLoading(true);

      const classifyResponse = await fetch('http://192.168.18.23:5000/classify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
          algorithm: algorithm,
        }),
      });

      const classifyData = await classifyResponse.json();

      if (classifyResponse.status !== 200) {
        throw new Error(classifyData.erro);
      }

      router.push({
        pathname: '/result',
        params: { classifyData: JSON.stringify(classifyData) },
      });

    } catch (error) {
      console.error('Error executing algorithm:', error);
      Alert.alert("Erro", `Erro ao executar algoritmo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o Algoritmo de IA:</Text>
      <Picker
        selectedValue={algorithm}
        style={styles.picker}
        onValueChange={(itemValue) => setAlgorithm(itemValue)}
      >
        <Picker.Item label="Algoritmo Genético" value="algGenetico" />
        <Picker.Item label="KNN" value="knn" />
        <Picker.Item label="Árvore de Decisão" value="arvore" />
      </Picker>
      <Text style={styles.label}>Selecione a Base de Dados:</Text>
      <TouchableOpacity onPress={handleFilePick} style={styles.button}>
        <Text style={styles.buttonText}>Carregar Base</Text>
      </TouchableOpacity>
      {baseLoaded && (
        <Text style={styles.successText}>Base carregada com sucesso: {dataset.name}</Text>
      )}
      <TouchableOpacity onPress={handleExecution} style={styles.btn}>
        <Text style={styles.buttonText}>Executar Algoritmo</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#6495ED" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  datasetName: {
    marginVertical: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#6495ED',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default HomeScreen;
