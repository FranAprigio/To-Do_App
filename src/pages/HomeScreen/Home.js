import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks(); // Carrega as tarefas salvas quando o componente é montado
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks'); // Carrega as tarefas do AsyncStorage
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../../../assets/iconpep.png')} />
        <Text style={styles.name}>Arthur Villaça Gadun</Text>
        <View style={styles.taskList}>
          <Text style={styles.taskListTitle}>Suas Tarefas</Text>
          <View>
            {tasks.map((task, index) => (
              <Text key={index} style={styles.task}>{task.name}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#FFF" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Lista')}>
          <Icon name="list" size={24} color="#FFF" />
          <Text style={styles.footerButtonText}>Lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskList: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
  },
  taskListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  task: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#62D2C3',
    paddingVertical: 10,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
});
