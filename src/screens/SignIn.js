import React, { useState, useCallback } from 'react'
import { StyleSheet, View, TextInput, Image } from 'react-native'
import Animated from 'react-native-reanimated'
import RippleButton from '../components/RippleButton'
import { useTheme } from '../context/Theme'
import logo from '../assets/logo.png'
import { useAuth } from '../context/Auth'

const SignInScreen = () => {
  const { animatedIconStyle, animatedBackgroundStyle, animatedPrimaryStyle } = useTheme()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('trinhchinchin@gmail.com')
  const [password, setPassword] = useState('Admin@123')

  const onPress = useCallback(() => {
    const userInput = {
      email,
      password
    }
    signIn(userInput)
  }, [])

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.loginContainer}>
        <RippleButton
          animated={true}
          style={[styles.loginButton, animatedPrimaryStyle]}
          onPress={onPress}
        >
          <Animated.Text style={animatedIconStyle}>Login</Animated.Text>
        </RippleButton>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: { alignItems: 'center' },
  textInput: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f7f8',
    color: "#737373"
  },
  emailContainer: { marginTop: 24 },
  passwordContainer: { marginTop: 16 },
  loginContainer: { marginTop: 16 },
  loginButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SignInScreen
