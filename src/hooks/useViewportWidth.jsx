import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const useViewportWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth,
  )

  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => {
        // eslint-disable-next-line no-undef
        setWidth(window.innerWidth)
      }),
      200,
    )
  })
  return width
}

export default useViewportWidth
