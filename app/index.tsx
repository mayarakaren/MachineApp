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

  const handleExecution = async () => {
    if (!dataset) {
      alert("Please select a dataset");
      return;
    }

    // First, upload the file
    const formData = new FormData();
    formData.append('file', {
      uri: dataset.uri,
      name: dataset.name,
      type: 'text/csv'
    });

    try {
      const uploadResponse = await fetch('http://<your-ip>:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.status !== 200) {
        throw new Error(uploadData.erro);
      }

      // Now classify the uploaded file
      const classifyResponse = await fetch('http://<your-ip>:5000/classify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filePath: uploadData.file_path,
          algorithm: algorithm
        }),
      });

      const classifyData = await classifyResponse.json();

      if (classifyResponse.status !== 200) {
        throw new Error(classifyData.erro);
      }

      console.log("Classify Response", classifyData);
      router.push("/result");
      
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
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
