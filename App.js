import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Initial from './screens/Initial';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import List from './screens/List';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskForm from './screens/TaskForm';
import Map from './screens/Map';
import TaskDetail from './screens/TaskDetail';
import Statistics from './screens/Statistics';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName='Initial'>
      <Stack.Screen name='Initial' component={Initial} />
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='Register' component={Register} />
			<Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='List' component={List} />
      <Stack.Screen name='TaskForm' component={TaskForm} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="Statistics" component={Statistics} />
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
