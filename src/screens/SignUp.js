import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
} from 'react-native'
import Animated from 'react-native-reanimated'
import RippleButton from '../components/RippleButton'
import { useTheme } from '../context/Theme'
import logo from '../assets/logo.png'
import { useAuth } from '../context/Auth'
import { PRIMARY_COLOR } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUpScreen = () => {
  const navigation = useNavigation()
  const { animatedIconStyle, animatedBackgroundStyle, animatedPrimaryStyle } =
    useTheme()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('trinhchinchin@gmail.com')
  const [password, setPassword] = useState('Admin@123')

  const onPress = useCallback(() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log('user---', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }, [])

  const navigateSignIn = useCallback(() => {
    navigation.navigate('SignIn')
  }, [])

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Create your Account</Text>
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
          <Animated.Text style={animatedIconStyle}>Sign Up</Animated.Text>
        </RippleButton>
      </View>

      <View style={styles.footer}>
        <Text style={styles.questionText}>Already have an account? </Text>
        <Pressable onPress={navigateSignIn}>
          <Text style={styles.signUpText}>Sign In</Text>
        </Pressable>
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
    backgroundColor: '#eeeeee',
    color: '#737373',
  },
  greetingContainer: { marginTop: 32 },
  greetingText: {
    color: '#404040',
    fontSize: 20,
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
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    color: '#404040',
  },
  signUpText: {
    color: PRIMARY_COLOR,
  },
})

export default SignUpScreen
