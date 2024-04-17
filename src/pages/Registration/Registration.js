import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Storage from '../../../database/storage';
import Authentication from "../../../database/authentication";

import { Link } from "@react-navigation/native";



const storage = new Storage();

export default function Registration({navigation}) {
  
        //variavel do storage
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //salva registro
    const addContent = () => {
    storage.add({ name, email, senha });
    // navigation.navigate('ListContentScreen');
    navigation.navigate('Home');

    };
  
    const handleRegister = async() => {
    await Authentication.registerUser(email, senha);
    await Authentication.login(email, senha);
    const userId = await Authentication.getCurrentUser();
    storage.registerUsername(name, userId).then(() => {
      navigation.navigate('Home');
    })   
    
  };
  
    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.h1}>Bem Vindo</Text>
            <Text style={styles.h2}>Vamos ajudá-lo a concluir suas tarefas</Text>

            <Text style={styles.sub}>Nome Completo</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Arthur Villaça Gadun"
                keyboardType="text"
            />
            <Text style={styles.sub}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="arthur.villaça.imagi.com"
                keyboardType="email-address"
            />
            
            <Text style={styles.sub}>Senha</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSenha}
                secureTextEntry={true}
                value={senha}
                placeholder="****************"
                keyboardType="numeric"
            />
            
            <Pressable style={styles.pressable}
            onPress={handleRegister}>
            <Text style={styles.pressableText}>REGISTRAR</Text>
            </Pressable>

            <Link style={styles.h3} to={{ screen: 'Login'}}>
            Ja possui uma conta? Sign In
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  h1:{
    fontSize:20,
    marginBottom:15,
  },

  h2:{
    fontSize:16,
    marginBottom:15,
  },

  sub:{
    fontSize:16,
  },

  input: {
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom:15,
    color:'#808080',
    borderRadius:9,
    borderColor:'#62D2C3',
  },

  h3:{
    marginTop:20,
    fontSize:15,
  },

  pressable:{
    backgroundColor: 'rgb(98, 210, 195)',
    width:100,
    height:35,
    alignItems:'center',
    justifyContent:'center',
    margin:8,
    borderRadius:2
  },

  pressableText:{
    fontWeight: 'bold',
    color:'white'
  },
});
