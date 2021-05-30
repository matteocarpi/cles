import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const useViewportHeight = () => {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' && window.innerHeight,
  )

  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => {
        // eslint-disable-next-line no-undef
        setHeight(window.innerHeight)
      }),
      200,
    )
  })
  return height
}

export default useViewportHeight
