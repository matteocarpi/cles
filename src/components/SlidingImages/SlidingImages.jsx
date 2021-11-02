import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import useIntersection from '../../hooks/useIntersection'

const Container = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  justify-content: center;
  align-items: center;
  padding-top: 35px;
  padding: 40px 24px;
  overflow-x: hidden;
  transform: scale(1.27) translateX(-10%);

  @media (min-width: 769px) {
    margin-top: 40px;
    width: 100%;
    max-width: 1300px;
    justify-content: flex-end;
    transform: scale(1) translateX(0);
  }
`

const GraphicContainer = styled(motion.div)`
  z-index: 1;
`

const PhotoContainer = styled(motion.div)``

const graphicVariants = {
  hidden: {
    translateX: 0,
    opacity: 0,
  },
  visible: {
    translateX: '30%',
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
}

const photoVariants = {
  hidden: {
    translateX: '30%',
  },
  visible: {
    translateX: 0,
    transition: {
      duration: 2,
    },
  },
}

const graphicVariantsReverse = {
  hidden: {
    translateX: '30%',
  },
  visible: {
    translateX: 0,
    transition: {
      duration: 2,
    },
  },
}

const photoVariantsReverse = {
  hidden: {
    translateX: '30%',
    opacity: 0,
  },
  visible: {
    translateX: '60%',
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
}

export default function SlidingImages({
  graphic,
  image,
  className,
  reverse = false,
}) {
  const ref = useRef()

  const elementHeight = ref?.current?.offsetHeight ?? 0

  const inView = useIntersection({
    element: ref?.current,
    threshold: 0.75,
    rootMargin: `${elementHeight}px 0px 0px 0px`,
  })

  const controls = useAnimation()

  useLayoutEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const graphicData = getImage(graphic)
  const imageData = getImage(image)

  return (
    <Container ref={ref} className={className} reverse={reverse}>
      <GraphicContainer
        variants={reverse ? graphicVariantsReverse : graphicVariants}
        initial="hidden"
        animate={controls}
      >
        <GatsbyImage image={graphicData} alt="" />
      </GraphicContainer>
      <PhotoContainer
        variants={reverse ? photoVariantsReverse : photoVariants}
        initial="hidden"
        animate={controls}
      >
        <GatsbyImage image={imageData} alt="" />
      </PhotoContainer>
    </Container>
  )
}
