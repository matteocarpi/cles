import { useState, useLayoutEffect } from 'react'

import useViewportHeight from './useViewportHeight'
import useViewportScroll from './useViewportScroll'

export default function useElementInView({ ref }) {
  const [elementStart, setElementStart] = useState()

  const viewportHeight = useViewportHeight()
  const scrollY = useViewportScroll()

  useLayoutEffect(() => {
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const offsetStart = rect.top + scrollTop

    setElementStart(offsetStart)
  }, [ref])

  return elementStart - viewportHeight <= scrollY
}
