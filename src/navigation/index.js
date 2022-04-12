import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignIn'
import SignUpScreen from '../screens/SignUp'
import HomeScreen from '../screens/Home'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isSignedIn = false
  return isSignedIn ? (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default Navigation
