import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Image, Pressable } from 'react-native';
import { Link } from "@react-navigation/native";
import Authentication from "../../../database/autentication"

export default function Login({navigation}) {
    const [email, setEmail] = React.useState(null);
    const [senha, setSenha] = React.useState(null);

    const handleLogin = () => {
      
          Authentication.login(email, senha)
          .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error);
        });
    
    
  };

    return (
        <View style={styles.container}>

            <Image style={styles.img1} source={require('../../../assets/to-do.png')}></Image>

            <Text style={styles.sub}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="arthur.villaça.imagi.com"
                keyboardType="text"
            />
            <Text style={styles.sub}>Senha</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSenha}
                secureTextEntry={true}
                value={senha}
                placeholder="****************"
                keyboardType="text"
            />

            <Text style={styles.pass}>Forget Password?</Text>

            <Pressable style={styles.pressable}
            onPress={() => handleLogin()}>
            <Text style={styles.pressableText}>LOGIN</Text>
            </Pressable>

            <Link style={styles.h3} to={{ screen: 'Registration'}}>
            Não possui uma conta? Sign Up
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

  sub:{
    fontSize: '1em',
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

  pass:{
    marginBottom:10,
  },

  h3:{
    marginTop:20,
    fontSize:'1em',
  },

  pressable:{
    backgroundColor: 'rgb(98, 210, 195)',
    width:80,
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
