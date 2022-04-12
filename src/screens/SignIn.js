import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SignInScreen = () => {
  return (
    <View
      style={styles.container
      }
    >
      <Text>SignInScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})

export default SignInScreen
