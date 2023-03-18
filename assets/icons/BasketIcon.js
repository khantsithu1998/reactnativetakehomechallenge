import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BasketIcon({width , height}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.59 1.363l-2.203 8.67H1.49l-1.49-8 14.018.01.52-2.043H18v1.363h-2.41zM12.335 8.67l1.337-5.263-12.039-.01.983 5.273h9.719zm1.365 4.15c0 1.202-.973 2.18-2.168 2.18a2.176 2.176 0 01-2.01-2.996H5.374A2.176 2.176 0 013.364 15a2.176 2.176 0 01-2.168-2.18c0-1.201.972-2.179 2.168-2.179h8.168c1.195 0 2.168.978 2.168 2.18zm-10.336.817a.815.815 0 00.812-.817.815.815 0 00-.812-.816.815.815 0 00-.813.816c0 .45.365.817.813.817zm8.168 0a.815.815 0 00.812-.817.815.815 0 00-.812-.816.815.815 0 00-.813.816c0 .45.365.817.813.817z"
        fill="#fff"
      />
    </Svg>
  )
}

export default BasketIcon
