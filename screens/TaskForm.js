import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import MediaCapture from '../components/MediaCapture';

export default function TaskForm() {
    const navigation = useNavigation();
    const route = useRoute();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskId, setTaskId] = useState(null);
    const [taskLocation, setTaskLocation] = useState(null);
    const [mediaUri, setMediaUri] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    useEffect(() => {
        if (route.params?.task) {
            const { name, description, id, location, mediaUri, mediaType } = route.params.task;
            setTaskName(name);
            setTaskDescription(description);
            setTaskId(id);
            setTaskLocation(location);
            setMediaUri(mediaUri);
            setMediaType(mediaType);
        }
        if (route.params?.address) {
            setTaskLocation(route.params.address);
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
                tasks[taskIndex].location = taskLocation;
                tasks[taskIndex].mediaUri = mediaUri;
                tasks[taskIndex].mediaType = mediaType;
            } else {
                const newTask = { id: Date.now(), name: taskName, description: taskDescription, location: taskLocation, mediaUri, mediaType };
                tasks.push(newTask);
            }

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            Alert.alert('Sucesso', 'Tarefa salva com sucesso');
            navigation.navigate('List');
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    const handleMediaCaptured = (uri, type) => {
        setMediaUri(uri);
        setMediaType(type);
    };

    const handleDeleteMedia = () => {
        setMediaUri(null);
        setMediaType(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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

            {taskLocation && (
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Endereço Selecionado:</Text>
                    <Text style={styles.addressText}>Rua: {taskLocation.street}</Text>
                    <Text style={styles.addressText}>Número: {taskLocation.name}</Text>
                    <Text style={styles.addressText}>Cidade: {taskLocation.subregion}</Text>
                    <Text style={styles.addressText}>Estado: {taskLocation.region}</Text>
                    <Text style={styles.addressText}>CEP: {taskLocation.postalCode}</Text>
                    <Text style={styles.addressText}>País: {taskLocation.country}</Text>
                </View>
            )}

            <View style={styles.mediaContainer}>
                {!mediaUri ? (
                    <MediaCapture onMediaCaptured={handleMediaCaptured} />
                ) : (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: mediaUri }} style={styles.mediaPreview} />
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMedia}>
                            <AntDesign name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map', { setTaskLocation: setTaskLocation })}>
                <Text style={styles.buttonText}>Selecionar Endereço</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveTask}>
                <Text style={styles.buttonText}>Salvar Tarefa</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF',
        padding: 20,
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
        marginVertical: 10,
    },
    saveButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    addressContainer: {
        marginTop: 20,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    addressText: {
        fontSize: 16,
    },
    mediaContainer: {
        flex: 1,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaPreview: {
        width: '100%',
        height: 300,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 10,
    },
});
