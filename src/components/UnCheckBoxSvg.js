import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const UnCheckBoxSvg = (props) => {
  const { fill = '#ffffff' } = props

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <AnimatedPath
        fill={fill}
        d="M5 2C3.346 2 2 3.346 2 5v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3H5zm19 3v14a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5z"
      />
    </Svg>
  )
}
export default UnCheckBoxSvg
