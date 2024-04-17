import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Map() {
    const navigation = useNavigation();
    const [initialRegion, setInitialRegion] = useState(null);
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão de localização não concedida');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const handleAddTask = async () => {
        if (taskName.trim() !== '') {
            const newTask = { id: Math.random().toString(), name: taskName, location: { latitude: initialRegion.latitude, longitude: initialRegion.longitude } };
            await saveTask(newTask);
            setTaskName('');
        }
    };

    const saveTask = async (task) => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            let tasks = [];
            if (savedTasks !== null) {
                tasks = JSON.parse(savedTasks);
            }
            tasks.push(task);
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    return (
        <View style={styles.container}>
            {initialRegion && (
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                >
                    <Marker coordinate={initialRegion} title="Localização atual" />
                </MapView>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    value={taskName}
                    onChangeText={setTaskName}
                    placeholder="Nova tarefa"
                    style={styles.input}
                />
                <Button title="Adicionar Tarefa" onPress={handleAddTask} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    footerButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
