import { useState, useEffect } from 'react'

export default function useIntersection({
  element,
  rootMargin,
  threshold = 0,
}) {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin, threshold },
    )

    if (element) observer.observe(element)

    return () => element && observer.unobserve(element)
  }, [element, rootMargin, threshold])

  return isVisible
}
