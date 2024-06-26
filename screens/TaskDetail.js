import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function TaskDetail({ navigation }) {
    const route = useRoute();
    const { task } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes da Tarefa</Text>
            </View>


            <View style={styles.detailContainer}>
                <Text style={styles.label}>Nome da Tarefa:</Text>
                <Text style={styles.value}>{task.name}</Text>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.value}>{task.description}</Text>
                <Text style={styles.label}>Tipo:</Text>
                <Text style={styles.text}>{task.type}</Text>
                <Text style={styles.label}>Localização:</Text>
                {task.location && (
                    <View>
                        <Text style={styles.value}>Rua: {task.location.street}</Text>
                        <Text style={styles.value}>Número: {task.location.name}</Text>
                        <Text style={styles.value}>Cidade: {task.location.subregion}</Text>
                        <Text style={styles.value}>Estado: {task.location.region}</Text>
                        <Text style={styles.value}>CEP: {task.location.postalCode}</Text>
                        <Text style={styles.value}>País: {task.location.country}</Text>
                    </View>
                )}
                <Text style={styles.label}>Mídia:</Text>
                {task.mediaUri && task.mediaType === 'image' ? (
                    <Image source={{ uri: task.mediaUri }} style={styles.mediaPreview} />
                ) : task.mediaUri && task.mediaType === 'video' ? (
                    <Video
                        source={{ uri: task.mediaUri }}
                        style={styles.mediaPreview}
                        useNativeControls
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.value}>Nenhuma mídia disponível</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    backButton: {
        padding: 10,
    },
    detailContainer: {
        marginTop: 5,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    mediaPreview: {
        width: '100%',
        height: 300,
        marginTop: 10,
    },
});
