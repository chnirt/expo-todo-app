import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { useTheme } from '../context/Theme'

export default function TaskList({ tasks, onValueDelete }) {
  const { isDark } = useTheme()
  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText

  if (tasks === null) return null

  return (
    <View>
      {tasks.length &&
        tasks.map((task, ti) => {
          return (
            <View key={`task-${ti}`} style={styles.row}>
              <Text style={themeTextStyle}>{task.title}</Text>
              <Button
                title="remove"
                onPress={() =>
                  typeof onValueDelete === 'function' && onValueDelete(task.id)
                }
              />
            </View>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
})
