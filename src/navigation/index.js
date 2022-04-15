import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignIn'
import SignUpScreen from '../screens/SignUp'
import HomeScreen from '../screens/Home'
import { useAuth } from '../context/Auth'
import { TaskProvider } from '../context/Task'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { user } = useAuth()
  const isSignedIn = !!user
  return isSignedIn ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        children={(props) => (
          <TaskProvider>
            <HomeScreen {...props} />
          </TaskProvider>
        )}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default Navigation
