import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Container = styled.div`
  position: relative;
`

const Mask = styled(GatsbyImage)`
  margin-bottom: 20px;
  position: absolute;
  top: 0;
  z-index: 1;
`

export default function MaskedImage({ image, className }) {
  const maskData = useStaticQuery(graphql`
    query MaskQuery {
      file(name: { eq: "mask-1" }) {
        id
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  const maskImage = getImage(maskData.file)

  return (
    <Container className={className}>
      <Mask image={maskImage} alt="mask of cles" />
      <GatsbyImage image={image} aspectRatio={1} />
    </Container>
  )
}
