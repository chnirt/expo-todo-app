import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Animated from 'react-native-reanimated'
import RippleButton from '../components/RippleButton'
import { useTheme } from '../context/Theme'

const SignInScreen = () => {
  const { animatedIconStyle, animatedPrimaryStyle } = useTheme()
  const [email, setEmail] = useState('trinhchinchin@gmail.com')
  const [password, setPassword] = useState('Admin@123')

  const onPress = useCallback(() => { }, [])

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />

      <RippleButton
        animated={true}
        style={[styles.loginButton, animatedPrimaryStyle]}
        onPress={onPress}
      >
        <Animated.Text style={animatedIconStyle}>Login</Animated.Text>
      </RippleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loginButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})

export default SignInScreen
