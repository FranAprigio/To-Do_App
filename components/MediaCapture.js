import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

const MediaCapture = ({ onMediaCaptured }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [mediaUri, setMediaUri] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setMediaUri(photo.uri);
            onMediaCaptured(photo.uri, 'image');
        }
    };

    const handleDeleteMedia = () => {
        setMediaUri(null);
        onMediaCaptured(null, null);
    };

    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>Não foi possível obter permissão para a câmera.</Text>;
    } else {
        return (
            <View style={styles.container}>
                {mediaUri ? (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: mediaUri }} style={styles.mediaPreview} />
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMedia}>
                            <Feather name="trash-2" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Camera style={styles.camera} type={type} ref={cameraRef}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                                <Feather name="camera" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                                <Feather name="refresh-cw" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    mediaPreview: {
        width: '100%',
        height: '100%',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 10,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MediaCapture;
