import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function Dashboard({navigation, handleRegister }) {
  
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <Image style={styles.img1} source={require('../../../assets/img1.png')}></Image>
      <Text style={styles.h1}>Iniciando com To-Do</Text>
      <Text style={styles.h2}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed posuere gravida purus id eu condimentum est diam quam. 
      Condimentum blandit diam.</Text>

      <Pressable style={styles.pressable}
      onPress={() => navigation.navigate('Registration')}>
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
    width:150,
    height: 150,
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
