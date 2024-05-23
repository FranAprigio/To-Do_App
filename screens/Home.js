import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

export default function Home({ navigation }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks !== null) {
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error('Erro ao carregar as tarefas:', error);
            }
        };

        loadTasks();
        const unsubscribe = navigation.addListener('focus', loadTasks);
        return unsubscribe;
    }, [navigation]);

    const handleTaskPress = (task) => {
        navigation.navigate('TaskDetail', { task });
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <Text style={styles.h2}>Bem-vindo ao aplicativo To-Do!</Text>

            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskItem}>
                        <Text style={styles.taskTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma tarefa encontrada</Text>}
                contentContainerStyle={styles.listContainer}
            />

            <Navbar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    taskItem: {
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999',
    },
});
