import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Map() {
    const navigation = useNavigation();
    const [initialRegion, setInitialRegion] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef(null);

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

    const handleSearch = async () => {
        if (searchQuery) {
            try {
                let geocode = await Location.geocodeAsync(searchQuery);
                if (geocode.length > 0) {
                    const { latitude, longitude } = geocode[0];
                    setSelectedLocation({ latitude, longitude });
                    mapRef.current.animateToRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }, 1000);
                } else {
                    Alert.alert('Endereço não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar endereço:', error);
            }
        }
    };

    const saveAddress = async () => {
        if (selectedLocation) {
            try {
                let reverseGeocode = await Location.reverseGeocodeAsync(selectedLocation);
                if (reverseGeocode.length > 0) {
                    const address = reverseGeocode[0];
                    console.log('Geocode reverso:', address);  // Log para verificar o conteúdo do endereço
                    navigation.navigate('TaskForm', { address });
                } else {
                    Alert.alert('Endereço não encontrado');
                }
            } catch (error) {
                console.error('Erro ao converter coordenadas em endereço:', error);
            }
        } else {
            Alert.alert('Por favor, selecione um endereço antes de salvar.');
        }
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Pesquisar endereço"
                onChangeText={setSearchQuery}
                value={searchQuery}
                platform="default"
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
                inputStyle={styles.searchInput}
                onSubmitEditing={handleSearch}
            />
            {initialRegion && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={initialRegion}
                >
                    {selectedLocation && (
                        <Marker coordinate={selectedLocation} title="Localização selecionada" />
                    )}
                </MapView>
            )}
            <TouchableOpacity style={styles.button} onPress={saveAddress}>
                <Text style={styles.buttonText}>Salvar Endereço</Text>
            </TouchableOpacity>
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
    searchContainer: {
        position: 'absolute',
        top: 10,
        width: '100%',
        zIndex: 1,
    },
    searchInputContainer: {
        backgroundColor: 'white',
    },
    searchInput: {
        height: 40,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
