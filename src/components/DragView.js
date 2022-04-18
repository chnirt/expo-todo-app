import React, { useState, useCallback } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DragView = ({ padX = 10, direction = 'br', children }) => {
  const { width, height } = useWindowDimensions()
  const { top, bottom } = useSafeAreaInsets()
  const [measure, setMeasure] = useState(null)
  const childrenWidth = measure?.width ?? 0
  const childrenHeight = measure?.height ?? 0
  const minWidth = padX
  const maxWidth = width - childrenWidth - padX
  const minHeight = top
  const maxHeight = height - childrenHeight - bottom

  const getPosition = useCallback(
    (directionInput) => {
      let newPosition = {}
      switch (directionInput) {
        case 'tl':
        case 'lt':
          newPosition = {
            x: padX,
            y: top,
          }
          break
        case 'tr':
        case 'rt':
          newPosition = {
            x: maxWidth - 64 - padX,
            y: top,
          }
          break
        case 'bl':
        case 'lb':
          newPosition = {
            x: padX,
            y: height - 64 - bottom,
          }
          break
        case 'br':
        case 'rb':
          newPosition = {
            x: maxWidth - 64 - padX,
            y: height - 64 - bottom,
          }
          break
        default:
          newPosition = {
            x: 0,
            y: 0,
          }
          break
      }
      return newPosition
    },
    [measure]
  )

  const translateX = useSharedValue(getPosition(direction).x)
  const translateY = useSharedValue(getPosition(direction).y)

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.translateX = translateX.value
        ctx.translateY = translateY.value
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.translateX + event.translationX
        translateY.value = ctx.translateY + event.translationY
      },
      onEnd: (_) => {
        if (translateX.value < minWidth || translateX.value <= maxWidth / 2) {
          translateX.value = withSpring(minWidth)
        }
        if (translateX.value > maxWidth || translateX.value > maxWidth / 2) {
          translateX.value = withSpring(maxWidth)
        }
        if (translateY.value < minHeight) {
          translateY.value = withSpring(minHeight)
        }
        if (translateY.value > maxHeight) {
          translateY.value = withSpring(maxHeight)
        }
      },
    },
    [measure]
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    }
  }, [])

  const onLayout = useCallback((event) => {
    var { width, height } = event.nativeEvent.layout
    setMeasure({
      width,
      height,
    })
  }, [])

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.childrenContainer, animatedStyle]}
        onLayout={!measure && onLayout}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  childrenContainer: {
    position: 'absolute',
  },
})

export default DragView
