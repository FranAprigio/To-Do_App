import React from "react";
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./src/pages/Dashboard/Dashboard"
import Login from "./src/pages/Login/Login"
import Registration from "./src/pages/Registration/Registration"
import Home from "./src/pages/HomeScreen/Home"
import Lista from "./src/components/List/Lista"
import MapScreen from "./src/components/Location/MapScreen";
 
const Stack = createNativeStackNavigator(); 


export default function App() {
  return (

    <NavigationContainer styles={styles.container}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
