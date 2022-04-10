import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Switch, TextInput } from 'react-native'
import TaskList from './src/components/TaskList'
import { useTheme } from './src/context/Theme'

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    setTasks([
      {
        id: 'hello',
        title: 'hello',
      },
    ])
  }, [])

  const onChangeTextValue = (text) => setTaskInput(text)

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask(taskInput)
    }
  }

  const addTask = (title) => {
    const newTask = {
      id: title,
      title,
    }
    setTasks((prevState) => [newTask].concat(prevState ?? []))
    setTaskInput('')
  }

  const removeTask = (id) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id))
    setTaskInput('')
  }

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
      <TextInput
        style={[styles.text, themeTextStyle]}
        value={taskInput}
        onChangeText={onChangeTextValue}
        placeholder="Typing..."
        onKeyPress={onKeyPress}
      />
      <TaskList tasks={tasks} onValueDelete={removeTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
