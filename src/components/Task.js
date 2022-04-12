import React, { useRef, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Animated as RNAnimated,
} from 'react-native'
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated'
import { Swipeable } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '../context/Theme'
import UnCheckBoxSvg from './UnCheckBoxSvg'
import CheckBoxSvg from './CheckBoxSvg'
import { ITEM_HEIGHT } from '../constants'

const AnimatedSvg = Animated.createAnimatedComponent(MaterialIcons)

const Task = ({ index, isBasic, task, onValueUpdate, onValueDelete }) => {
  const initialMode = useRef(true)
  const { isDark, animatedTextStyle, animatedIconStyle } = useTheme()

  useEffect(() => {
    initialMode.current = false
  }, [])

  const getFill = useCallback(() => {
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
  }, [isDark, task.completed])

  const TaskContent = useCallback(() => {
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

  const renderRightActions = useCallback(
    (progress, dragX) => {
      const actionSize = 100
      const translateX = dragX.interpolate({
        inputRange: [-actionSize, 0],
        outputRange: [0, actionSize],
      })
      return (
        <RNAnimated.View
          style={[
            styles.rightActions,
            { width: actionSize },
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        >
          <AnimatedSvg style={animatedIconStyle} name="delete" size={24} />
        </RNAnimated.View>
      )
    },
    [animatedIconStyle]
  )
  // const renderLeftActions = useCallback((progress, dragX) => {
  //   const translateX = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   })

  //   return (
  //     <RNAnimated.View
  //       style={[
  //         {
  //           flex: 1,
  //           backgroundColor: '#ccffbd',
  //           justifyContent: 'center',
  //         },
  //         {
  //           transform: [
  //             {
  //               translateX,
  //             },
  //           ],
  //         },
  //       ]}
  //     >
  //       <Text
  //         style={{
  //           color: '#40394a',
  //           paddingHorizontal: 10,
  //           fontWeight: '600',
  //           paddingHorizontal: 30,
  //           paddingVertical: 20,
  //         }}
  //       >
  //         Bookmark
  //       </Text>
  //     </RNAnimated.View>
  //   )
  // }, [])
  const onSwipeableRightOpen = useCallback(() => {
    // console.log("onSwipeableRightOpen")
    typeof onValueDelete === 'function' && onValueDelete(task.id)
  }, [task.id])
  // const onSwipeableLeftOpen = useCallback(
  //   (a) => {
  //     console.log('hello')
  //     // typeof onValueUpdate === 'function' && onValueUpdate(task.id)
  //   },
  //   [task.id]
  // )

  if (isBasic) {
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        // renderLeftActions={renderLeftActions}
        onSwipeableRightOpen={onSwipeableRightOpen}
      // onSwipeableLeftOpen={onSwipeableLeftOpen}
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
  checkBoxContainer: {},
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
  rightActions: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Task
