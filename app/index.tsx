import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker"
import { useRouter } from 'expo-router';


const HomeScreen = () => {
  const [algorithm, setAlgorithm] = useState<string>('');
  const [dataset, setDataset] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const router = useRouter()

  const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/data"],
        multiple: false,
      });

      if (!result.canceled) {
        setDataset(result.assets[0]); 
      }
  };

  const handleExecution = () => {
    router.push("/result")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o Algoritmo de IA:</Text>
      <Picker
        selectedValue={algorithm}
        style={styles.picker}
        onValueChange={(itemValue) => setAlgorithm(itemValue)}
      >
        <Picker.Item label="Algoritmo Genético" value="genetic" />
        <Picker.Item label="KNN" value="knn" />
        <Picker.Item label="Árvore de Decisão" value="decision_tree" />
      </Picker>
      <Text style={styles.label}>Selecione a Base de Dados:</Text>
      <TouchableOpacity onPress={pickDocument} style={styles.button}>
        <Text>
          Carregar Base
        </Text>
      </TouchableOpacity>
      {dataset && (
        <Text style={styles.datasetName}>{dataset.name}</Text>
      )}
      <TouchableOpacity onPress={handleExecution} style={styles.btn}>
        <Text>
          Executar Algoritmo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    color: 'grey',
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    color: '#ffffff',
  },
  btn: {
    backgroundColor: '#6495ED',
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    color: '#ffffff',
  }
});

export default HomeScreen;
