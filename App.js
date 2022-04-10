import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Switch,
  TextInput,
  Button,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import TaskList from './src/components/TaskList'
import { useTheme } from './src/context/Theme'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const [taskInput, setTaskInput] = useState('' + Date.now().toString())
  const [tasks, setTasks] = useState(null)

  const onChangeTextValue = (text) => setTaskInput(text)

  const actionAnimation = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString() + title,
      title,
    }
    setTasks((prevState) => [newTask].concat(prevState ?? []))
    setTaskInput('' + Date.now().toString())
  }

  const removeTask = (id) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id))
    setTaskInput('' + Date.now().toString())
  }

  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText
  const themeContainerStyle = isDark
    ? styles.darkContainer
    : styles.lightContainer

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.text, themeTextStyle]}
            value={taskInput}
            onChangeText={onChangeTextValue}
            placeholder="Typing..."
          />
          <Button
            title="add + layout"
            color="green"
            onPress={() => {
              actionAnimation()
              addTask(taskInput)
            }}
          />
          <Button
            title="add"
            color="green"
            onPress={() => {
              addTask(taskInput)
            }}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
          }}
        >
          <TaskList
            tasks={tasks}
            onValueDelete={(id) => {
              actionAnimation()
              removeTask(id)
            }}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
          }}
        >
          <TaskList
            type="reanimated"
            tasks={tasks}
            onValueDelete={removeTask}
          />
        </View>
      </View>
    </SafeAreaView>
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
