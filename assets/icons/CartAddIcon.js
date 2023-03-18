import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CartAddIcon(props) {
  return (
    <Svg
      height="32px"
      viewBox="0 0 32 32"
      width="32px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.221 7.206l9.585 9.585a2.265 2.265 0 010 3.195l-.8.801a2.266 2.266 0 01-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 01-3.194 0l-.8-.801a2.265 2.265 0 010-3.195l9.587-9.585a2.24 2.24 0 011.723-.647 2.247 2.247 0 011.723.647z"
        fill="#515151"
      />
    </Svg>
  )
}

export default CartAddIcon
