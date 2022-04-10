import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { useTheme } from '../context/Theme'
import { Task } from './Task'

export default function TaskList({ type = 'basic', tasks, onValueDelete }) {
  const isBasic = type === 'basic';
  const { isDark } = useTheme()
  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText

  if (tasks === null)
    return (
      <View>
        <Text style={themeTextStyle}>Loading...</Text>
      </View>
    )

  return (
    <FlatList data={tasks} keyExtractor={item => item.id} renderItem={({ item }) => <Task isBasic={isBasic} task={item} onValueDelete={onValueDelete} />} />
  )
}

const styles = StyleSheet.create({
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
})
