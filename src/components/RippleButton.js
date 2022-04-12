import React, {
  useRef,
  useState,
  useCallback,
  Fragment,
} from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'
import { useTheme } from '../context/Theme'

const RippleButton = ({
  minDurationMs = 800,
  onPress,
  children,
  rippleColor = '#42424250',
  animated = false,
  style = {},
}) => {
  const [measure, setMeasure] = useState(null)
  const width = measure?.width ?? 1
  const height = measure?.height ?? 1
  const centerX = useSharedValue(width / 2)
  const centerY = useSharedValue(height / 2)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  const animatedRippleStyle = useAnimatedStyle(() => {
    const rippleSize = Math.sqrt(width ** 2 + height ** 2)

    return {
      position: 'absolute',
      width: rippleSize * 2,
      height: rippleSize * 2,
      borderRadius: rippleSize,
      top: -rippleSize,
      left: -rippleSize,
      backgroundColor: rippleColor,
      opacity: opacity.value,
      transform: [
        {
          translateX: centerX.value,
        },
        {
          translateY: centerY.value,
        },
        {
          scale: scale.value,
        },
      ],
    }
  })

  const doubleTapRef = useRef()

  const onLayout = useCallback((event) => {
    const { height, width } = event.nativeEvent.layout
    setMeasure({
      width,
      height,
    })
  }, [])

  const onLongPress = useCallback((event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // console.log('onLongPress')
    }
  }, [])

  const onSingleTap = useCallback((event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // console.log('onSingleTap')
      centerX.value = event.nativeEvent.x
      centerY.value = event.nativeEvent.y
      scale.value = 0
      scale.value = withTiming(1, { duration: 500 })
      opacity.value = 1
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      typeof onPress === 'function' && runOnJS(onPress)()
    }
    if (event.nativeEvent.state === State.END) {
      opacity.value = withTiming(0)
    }
  }, [])

  const onDoubleTap = useCallback((event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // console.log('onDoubleTap')
    }
  }, [])

  const Content = () => {
    return (
      <Fragment>
        {children}
        <Animated.View style={[animatedRippleStyle]} />
      </Fragment>
    )
  }

  return (
    <View onLayout={!measure && onLayout}>
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={minDurationMs}
      >
        <TapGestureHandler
          onHandlerStateChange={onSingleTap}
          waitFor={doubleTapRef}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={onDoubleTap}
            numberOfTaps={2}
          >
            {animated ? (
              <Animated.View style={[styles.button, style]}>
                <Content />
              </Animated.View>
            ) : (
              <View style={[styles.button, style]}>
                <Content />
              </View>
            )}
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
})

export default RippleButton
