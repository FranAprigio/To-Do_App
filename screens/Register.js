import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, StyleSheet, Pressable, Image } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../services/firebaseAuth';
import { Link } from "@react-navigation/native";

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Home');
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };
    
    return (
        <View style={styles.container}>
            <Image style={styles.img1} source={require('../assets/register-img.png')}></Image>

            <Text style={styles.h1}>Crie sua conta</Text>

            <Text style={styles.h2}>Cadastre-se para saber todas as suas tarefas</Text>

            <Text style={styles.sub}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail"
                keyboardType="email-address"
            />

            <Text style={styles.sub}>Senha</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
                placeholder="Senha"
            />

            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            {error && <Text style={{color:"red"}}>{error}</Text>}

            <Text onPress={goToLogin} style={styles.link}>
                Já possui uma conta? Login
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: '#E6E6E6',
    },

    img1:{
        width:250,
        height: 250,
    },

    h1: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    h2: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    sub: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        color: '#808080',
        borderRadius: 9,
        borderColor: '#62D2C3',
    },
    button: {
        backgroundColor: 'rgb(98, 210, 195)',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 2,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    link: {
        marginVertical: 10,
        color: 'blue',
    },
});
