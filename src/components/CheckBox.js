import * as React from "react"
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { useEffect } from "react/cjs/react.development";

const AnimatedPath = Animated.createAnimatedComponent(Path);


const SvgComponent = (props) => {
  const radius = useSharedValue(50);

  useEffect(() => {
    radius.value = withDelay(500, withSequence(withTiming(100), withTiming(50)))
  }, [])

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
    M 100, 100
    m -${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
    `;
    return {
      d: path,
    };
  });

  // attach animated props to an SVG path using animatedProps
  return (
    <Svg>
      <AnimatedPath animatedProps={animatedProps} fill="black" />
    </Svg>
  );

  const { size = 24, fill = "#000000" } = props
  const blankD = 'M5 100 200 L 200 100 -100 -200'
  const d = 'M5 3c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V9.242l-2 2L19.002 19H5V5h11.758l2-2H5zm16.293.293L11 13.586l-3.293-3.293-1.414 1.414L11 16.414 22.707 4.707l-1.414-1.414z'
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <Path fill={fill} d={d}
        strokeDashoffset={10}
      />
    </Svg>
  )
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
    </Svg>
  )
}

export default SvgComponent
