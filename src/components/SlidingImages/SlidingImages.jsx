import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import useElementInView from '../../hooks/useElementInView'

const Container = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  padding: 24px;
  @media (min-width: 769px) {
    margin-top: 40px;
    width: 100%;
    justify-content: flex-end;
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

  const inView = useElementInView({ ref, center: true })

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
