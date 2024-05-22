import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function TaskForm() {
    const navigation = useNavigation();
    const route = useRoute();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskId, setTaskId] = useState(null);

    useEffect(() => {
        if (route.params?.task) {
            setTaskName(route.params.task.name);
            setTaskDescription(route.params.task.description);
            setTaskId(route.params.task.id);
        }
    }, [route.params]);

    const saveTask = async () => {
        try {
            let tasks = await AsyncStorage.getItem('tasks');
            tasks = tasks ? JSON.parse(tasks) : [];

            if (taskId) {
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                tasks[taskIndex].name = taskName;
                tasks[taskIndex].description = taskDescription;
            } else {
                const newTask = { id: Date.now(), name: taskName, description: taskDescription };
                tasks.push(newTask);
            }

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            navigation.navigate('List');
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('List')} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Tarefa</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Nome da tarefa"
                value={taskName}
                onChangeText={setTaskName}
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Descrição da tarefa"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} onPress={saveTask}>
                <Text style={styles.buttonText}>Salvar Tarefa</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#62D2C3',
        height: 60,
        paddingHorizontal: 10,

    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
        marginLeft: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        marginTop: 20, 
        paddingHorizontal: 10,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#62D2C3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
});
