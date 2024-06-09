import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

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
  
      if (result.type === 'success') {
        const file = result.assets ? result.assets[0] : result;
        const { name, uri } = file;
  
        console.log('Selected file:', file);
  
        setLoading(true);
  
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: uri,
            name: name,
            type: '*/*',
          });
  
          const uploadResponse = await fetch('http://192.168.18.23:5000/upload', {
            method: 'POST',
            body: formData,
          });
  
          const uploadData = await uploadResponse.json();
  
          console.log('Upload response:', uploadData);
  
          if (uploadResponse.status !== 200) {
            throw new Error(uploadData.erro || 'Upload failed');
          }
  
          setBaseLoaded(true); // Informa que a base foi carregada com sucesso
          Alert.alert("Sucesso", "Base carregada com sucesso!");
        } catch (error) {
          console.error('Error uploading file:', error);
          Alert.alert("Erro", `Erro ao carregar base de dados: ${error.message}`);
        } finally {
          setLoading(false);
        }
      } else {
        Alert.alert("Erro", "Nenhum arquivo selecionado");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Erro", "Erro ao selecionar o arquivo");
    }
  };
  
  const handleExecution = async () => {
    if ((algorithm === 'knn' || algorithm === 'arvore') && !dataset) {
      Alert.alert("Erro", "Por favor, selecione um conjunto de dados");
      return;
    }

    let filePath = dataset ? dataset.filePath : '';

    try {
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

      console.log('Classify response:', classifyData);

      if (classifyResponse.status !== 200) {
        throw new Error(classifyData.erro);
      }

      console.log('Navigation params:', { classifyData: JSON.stringify(classifyData) });

      router.push({
        pathname: '/result',
        params: { classifyData: JSON.stringify(classifyData) },
      });

    } catch (error) {
      console.error('Error executing algorithm:', error);
      Alert.alert("Erro", `Erro ao executar algoritmo: ${error.message}`);
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
        <Text style={styles.successText}>Base carregada com sucesso!</Text>
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
});

export default HomeScreen;
