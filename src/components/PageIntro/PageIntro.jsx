import React from 'react'
import styled from 'styled-components'

import SlidingImages from '../SlidingImages'

const Container = styled.section`
  margin-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Description = styled.h3`
  padding: 0 20px;
`

const StyledSlidingImages = styled(SlidingImages)`
  align-self: flex-end;
`

export default function PageIntro({ text, graphic, image }) {
  return (
    <Container>
      <Description>{text}</Description>
      <StyledSlidingImages graphic={graphic} image={image} />
    </Container>
  )
}
