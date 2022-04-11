import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutLeft,
  // LightSpeedOutRight,
} from 'react-native-reanimated'
import { useTheme } from '../context/Theme'

const Task = ({ isBasic, task, onValueDelete }) => {
  const { isDark } = useTheme()
  const themeTextStyle = isDark ? styles.darkThemeText : styles.lightThemeText

  if (isBasic) {
    return (
      <View style={styles.row}>
        <Text style={themeTextStyle}>{task.title}</Text>
        <Button
          title="remove"
          color="red"
          onPress={() =>
            typeof onValueDelete === 'function' && onValueDelete(task.id)
          }
        />
      </View>
    )
  }

  return (
    <Animated.View
      style={styles.row}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutLeft}
      layout={Layout.springify()}
    >
      <Text style={themeTextStyle}>{task.title}</Text>
      <Button
        title="remove"
        color="red"
        onPress={() =>
          typeof onValueDelete === 'function' && onValueDelete(task.id)
        }
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
})

export default Task
