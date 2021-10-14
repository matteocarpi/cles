import { useState, useLayoutEffect } from 'react'

import useViewportHeight from './useViewportHeight'
import useViewportScroll from './useViewportScroll'

export default function useElementInView({
  ref,
  center = false,
  fullElement = false,
}) {
  const [elementStart, setElementStart] = useState()
  const [elementHeight, setElementHeight] = useState()
  const viewportHeight = useViewportHeight()
  const scrollY = useViewportScroll()

  useLayoutEffect(() => {
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const offsetStart = rect.top + scrollTop

    setElementStart(offsetStart)
    setElementHeight(rect.height)
  }, [ref])

  const elementInView = elementStart - viewportHeight <= scrollY

  const elementInCenter =
    elementStart - viewportHeight / 2 + elementHeight / 2 <= scrollY

  const elementEndInView =
    elementStart - viewportHeight + elementHeight - 200 <= scrollY

  if (center) return elementInCenter
  if (fullElement) return elementEndInView
  return elementInView
}
