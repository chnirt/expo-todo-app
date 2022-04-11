import * as React from "react"
import Svg, { Path } from "react-native-svg"

const UnCheckBoxSvg = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.114 8.587c0-2.658 0-3.987.517-5.002A4.747 4.747 0 0 1 3.706 1.51C4.72.993 6.05.993 8.709.993h.633c2.658 0 3.987 0 5.002.517a4.747 4.747 0 0 1 2.075 2.075c.517 1.015.517 2.344.517 5.002v.633c0 2.659 0 3.988-.517 5.003a4.747 4.747 0 0 1-2.075 2.075c-1.015.517-2.344.517-5.002.517h-.633c-2.659 0-3.988 0-5.003-.517a4.747 4.747 0 0 1-2.075-2.075c-.517-1.015-.517-2.344-.517-5.003v-.633Z"
      fill="#fff"
      stroke="#E8E8E8"
      strokeWidth={1.582}
    />
  </Svg>
)

export default UnCheckBoxSvg
