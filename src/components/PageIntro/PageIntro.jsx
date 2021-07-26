import React from 'react'
import styled from 'styled-components'

import SlidingImages from '../SlidingImages'

const Container = styled.section`
  margin-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 22vw;
    padding: 0 40px;
  }
`

const Description = styled.h3`
  padding: 0 20px;
  max-width: 1000px;

  @media (min-width: 768px) {
    align-self: flex-start;
    padding: 0;
  }
`

const StyledSlidingImages = styled(SlidingImages)`
  align-self: flex-end;

  @media (min-width: 768px) {
    padding: 0;
  }
`

export default function PageIntro({ text, graphic, image }) {
  return (
    <Container>
      <Description>{text}</Description>
      <StyledSlidingImages graphic={graphic} image={image} />
    </Container>
  )
}
