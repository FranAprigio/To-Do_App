import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function Initial({navigation }) {
  
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <Image style={styles.img1} source={require('../assets/initial-img.png')}></Image>
      <Text style={styles.h1}>Iniciando com To-Do</Text>
      <Text style={styles.h2}>
      Bem-vindo ao aplicativo To-Do! Aqui você pode gerenciar suas tarefas diárias 
      de forma fácil e eficiente. 
      Mantenha-se organizado e produtivo com nossa interface intuitiva e 
      recursos poderosos.</Text>

      <Pressable style={styles.pressable}
      onPress={() => navigation.navigate('Register')}>
      <Text style={styles.pressableText}>INICIAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img1:{
    width:280,
    height: 200,
  },

  h1:{
    fontSize:20,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop:60,
  },

  h2:{
    fontSize:15,
    paddingBottom:70,
    width:300,
    alignContent:'center',
    textAlign:'center',
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
