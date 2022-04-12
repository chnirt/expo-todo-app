import React, { useRef, useEffect, useCallback } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated'
import { Swipeable } from 'react-native-gesture-handler'
import { useTheme } from '../context/Theme'
import UnCheckBoxSvg from './UnCheckBoxSvg'
import CheckBoxSvg from './CheckBoxSvg'
import { ITEM_HEIGHT } from '../constants'

const Task = ({ index, isBasic, task, onValueUpdate, onValueDelete }) => {
  const initialMode = useRef(true)
  const { isDark, animatedTextStyle } = useTheme()

  useEffect(() => {
    initialMode.current = false
  }, [])

  const TaskContent = useCallback(() => {
    const getFill = () => {
      if (isDark) {
        if (task.completed) {
          return '#FFFFFF50'
        }
        return '#FFFFFF'
      }
      if (task.completed) {
        return '#18181850'
      }
      return '#181818'
    }
    return (
      <View style={styles.row}>
        <View style={styles.checkBoxContainer}>
          {task.completed ? (
            <CheckBoxSvg fill={getFill()} />
          ) : (
            <UnCheckBoxSvg fill={getFill()} />
          )}
        </View>
        <View style={styles.contentContainer}>
          <Animated.Text
            style={[
              animatedTextStyle,
              styles.todoText,
              styles.titleText,
              task.completed && styles.completedText,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Animated.Text>
          <Animated.Text
            style={[
              animatedTextStyle,
              styles.todoText,
              styles.timeText,
              task.completed && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {task.createdAt}
          </Animated.Text>
        </View>
      </View>
    )
  }, [task.completed, animatedTextStyle])

  const renderLeftActions = useCallback(() => {
    return (
      <View>
        <Text>renderLeftActions</Text>
      </View>
    )
  }, [])
  const renderRightActions = useCallback(() => {
    return (
      <View>
        <Text>renderLeftActions</Text>
      </View>
    )
  }, [])
  const onSwipeableRightOpen = useCallback(() => { }, [])
  const onSwipeableLeftOpen = useCallback(() => { }, [])

  if (isBasic) {
    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={onSwipeableRightOpen}
        onSwipeableLeftOpen={onSwipeableLeftOpen}
      >
        <Pressable
          style={styles.row}
          onPress={() =>
            typeof onValueUpdate === 'function' && onValueUpdate(task.id)
          }
        >
          <TaskContent />
        </Pressable>
      </Swipeable>
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
  },
  contentContainer: {
    marginLeft: 10,
  },
  todoText: {
    fontStyle: 'normal',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#737373',
  },
  timeText: {
    fontSize: 10,
    lineHeight: 14,
    color: '#A3A3A3',
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#737373',
    opacity: 0.5,
  },
})

export default Task
