import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SuccessIcon({width, height}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M110 55c0 30.376-24.624 55-55 55S0 85.376 0 55 24.624 0 55 0s55 24.624 55 55zM85.454 42.648a7.5 7.5 0 00-10.907-10.297L44.171 64.525l-9.379-7.794a7.5 7.5 0 00-9.586 11.537l14.792 12.293a7.5 7.5 0 0010.247-.62l35.208-37.293z"
        fill="#5DDD48"
      />
    </Svg>
  )
}

export default SuccessIcon
