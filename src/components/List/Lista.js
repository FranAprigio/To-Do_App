import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Lista() {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTasks();
        });
        
        return unsubscribe;
    }, []);

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
                        <View>
                            <Text>{item.name}</Text>
                            <Text>Localização: {item.location.latitude}, {item.location.longitude}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                            <Icon name="trash" size={24} color="#FF0000" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Map')}>
                <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Lista')}>
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
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        backgroundColor: '#62D2C3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
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
        fontSize: 18,
    },
});
