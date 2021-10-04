import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BgImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'

const Container = styled.div`
  overflow: hidden;
`

const Image = styled(BgImage)``

const Mask = styled(GatsbyImage)`
  margin-bottom: 20px;
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

  const bgImage = convertToBgImage(image)
  const maskImage = getImage(maskData.file)

  return (
    <Container className={className}>
      <Image {...bgImage}>
        <Mask image={maskImage} alt="" />
      </Image>
    </Container>
  )
}
