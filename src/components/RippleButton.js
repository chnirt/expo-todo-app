import React, { useRef } from 'react'
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
  size = 100,
  minDurationMs = 800,
  onPress,
  children,
  rippleColor = '#42424250'
}) => {
  const { animatedPrimaryStyle, animatedShadowStyle } = useTheme()
  const centerX = useSharedValue(size / 2)
  const centerY = useSharedValue(size / 2)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  const rippleSize = Math.sqrt(size ** 2 + size ** 2)

  const animatedRippleStyle = useAnimatedStyle(() => ({
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
  }))

  const doubleTapRef = useRef()

  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // console.log('onLongPress')
    }
  }

  const onSingleTap = (event) => {
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
  }
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // console.log('onDoubleTap')
    }
  }

  return (
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
          <Animated.View
            style={[
              styles.button,
              animatedPrimaryStyle,
              animatedShadowStyle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}
          >
            <View>{children}</View>
            <Animated.View style={[animatedRippleStyle]} />
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    overflow: 'hidden',
  },
})

export default RippleButton
