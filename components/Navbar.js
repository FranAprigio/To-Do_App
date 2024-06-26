import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o hook useNavigation

const Navbar = () => {
  const navigation = useNavigation(); // Utilize o hook useNavigation

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={32} color="#FFF" />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('List')}>
        <Ionicons name="list" size={32} color="#FFF" />
        <Text style={styles.footerButtonText}>Lista</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Statistics')}>
                <Icon name="bar-chart" size={24} color="#FFF" />
                <Text style={styles.footerButtonText}>Estatísticas</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#62D2C3',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 18,
  },
});

export default Navbar;
