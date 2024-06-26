import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Navbar';

export default function List({ navigation }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTasks();
        });

        return unsubscribe;
    }, [navigation]);

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

    const handleDeleteTask = async (id) => {
        try {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            Alert.alert('Sucesso', 'Tarefa excluída com sucesso');
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View style={styles.taskTextContainer}>
                            <Text style={styles.taskName}>{item.name}</Text>
                            <Text style={styles.taskDescription}>{item.description}</Text>
                        </View>
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { task: item })}>
                                <Icon name="edit" size={24} color="#0000FF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                                <Icon name="trash" size={24} color="#FF0000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma tarefa encontrada</Text>}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskForm')}>
                <Icon name="plus" size={24} color="#FFF" />
                <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskTextContainer: {
        flex: 1,
        paddingRight: 20,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#62D2C3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        margin: 20,
        marginBottom: 80,
        borderRadius: 25,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        marginLeft: 10,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999',
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 16,
        color: '#666',
    },
});
