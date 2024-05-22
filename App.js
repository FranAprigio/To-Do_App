import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Initial from './screens/Initial';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName='Initial'>
      <Stack.Screen name='Initial' component={Initial} />
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='Register' component={Register} />
			<Stack.Screen name='Home' component={Home} />
		</Stack.Navigator>
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
