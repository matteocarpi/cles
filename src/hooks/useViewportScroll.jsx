import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const useViewportScroll = () => {
  const [scroll, setScroll] = useState(
    typeof window !== 'undefined' && window.scrollY,
  )

  useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(() => {
        // eslint-disable-next-line no-undef
        setScroll(window.scrollY)
      }),
      200,
    )
  })

  return scroll
}

export default useViewportScroll
