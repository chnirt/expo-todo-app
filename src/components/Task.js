import React, { useRef, useEffect, useCallback } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import Animated, {
  Layout,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated'
import { useTheme } from '../context/Theme'
import UnCheckBoxSvg from './UnCheckBoxSvg'
import CheckBoxSvg from './CheckBoxSvg'
import { ITEM_HEIGHT } from './TaskList'

const Task = ({ index, isBasic, task, onValueUpdate, onValueDelete }) => {
  const initialMode = useRef(true)
  const { animatedTextStyle } = useTheme()

  useEffect(() => {
    initialMode.current = false
  }, [])

  const TaskContent = useCallback(() => {
    return (
      <View style={styles.row}>
        <View style={styles.checkBoxContainer}>
          {task.completed ? <CheckBoxSvg /> : <UnCheckBoxSvg />}
        </View>
        <View style={styles.contentContainer}>
          <Animated.Text
            style={[
              styles.titleText,
              animatedTextStyle,
              task.completed && styles.completedText,
            ]}
          >
            {task.title}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.timeText,
              animatedTextStyle,
              task.completed && styles.completedText,
            ]}
          >
            {task.createdAt}
          </Animated.Text>
        </View>
      </View>
    )
  }, [task, animatedTextStyle])

  if (isBasic) {
    return (
      <Pressable
        style={styles.row}
        onPress={() =>
          typeof onValueUpdate === 'function' && onValueUpdate(task.id)
        }
      >
        <TaskContent />
      </Pressable>
    )
  }

  return (
    <Animated.View
      entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
      exiting={FadeOut}
      layout={Layout.delay(100)}
      onTouchEnd={() =>
        typeof onValueDelete === 'function' && onValueDelete(task.id)
      }
    >
      <TaskContent />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  row: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    // borderWidth: 1
  },
  contentContainer: {
    marginLeft: 10,
  },
  titleText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#737373',
  },
  timeText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    color: '#A3A3A3',
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#737373',
  },
})

export default Task
