import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

import useElementInView from '../../hooks/useElementInView'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`

const GraphicContainer = styled(motion.div)`
  transform: translateX(30%);
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
    opacity: 0,
  },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
}

export default function SlidingImages() {
  const data = useStaticQuery(graphql`
    query Graphic {
      graphic: allFile(filter: { name: { eq: "first-level-graphic" } }) {
        nodes {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      photo: allFile(filter: { name: { eq: "first-level-photo" } }) {
        nodes {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const ref = useRef()

  const inView = useElementInView({ ref })

  const controls = useAnimation()

  useLayoutEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const graphic = getImage(data.graphic.nodes[0])
  const photo = getImage(data.photo.nodes[0])

  return (
    <Container ref={ref}>
      <GraphicContainer
        variants={graphicVariants}
        initial="hidden"
        animate={controls}
      >
        <GatsbyImage image={graphic} alt="" />
      </GraphicContainer>
      <PhotoContainer
        variants={photoVariants}
        initial="hidden"
        animate={controls}
      >
        <GatsbyImage image={photo} alt="" />
      </PhotoContainer>
    </Container>
  )
}
