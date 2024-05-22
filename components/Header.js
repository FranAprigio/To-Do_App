import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o Ionicons corretamente
import { signOut } from 'firebase/auth'; // Importe a função signOut do pacote de autenticação do Firebase
import auth from "../services/firebaseAuth";

const Header = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Realiza o logout usando a função signOut
      navigation.navigate('Login'); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
        <Ionicons name="log-out" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#62D2C3',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  menuIcon: {
    marginLeft: 10,
  },
  logoutIcon: {
    marginRight: 10,
  },
});

export default Header;
