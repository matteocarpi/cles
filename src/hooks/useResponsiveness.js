import useViewportWidth from './useViewportWidth'

export default function useResponsiveness() {
  const width = useViewportWidth()

  const isMobile = width <= 768

  return { isMobile }
}
