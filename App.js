import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { useTheme } from './src/context/Theme'

export default function App() {
  const { isDark, toggleTheme } = useTheme()

  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText
  const themeContainerStyle = isDark
    ? styles.darkContainer
    : styles.lightContainer

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />

      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDark}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
})
