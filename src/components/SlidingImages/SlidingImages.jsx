import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

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

  const graphic = getImage(data.graphic.nodes[0])
  const photo = getImage(data.photo.nodes[0])

  return (
    <Container>
      <GraphicContainer>
        <GatsbyImage image={graphic} />
      </GraphicContainer>
      <PhotoContainer>
        <GatsbyImage image={photo} />
      </PhotoContainer>
    </Container>
  )
}
