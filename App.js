import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddGroupScreen from './pages/AddGroupScreen';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AddGroupScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AddGroupScreen" component={AddGroupScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}