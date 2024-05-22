import { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable, Image } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../services/firebaseAuth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const checkIfLoggedIn = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Home');
            }
        });
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleLogin = () => {
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Home');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const goToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        
        <View style={styles.container}>
            <Image style={styles.img1} source={require('../assets/login-img.png')}></Image>

            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
                placeholder="Senha"
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Text onPress={goToRegister} style={styles.link}>
                Create an account? Register here
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E6E6E6',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
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
    img1:{
        width:250,
        height: 250,
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
