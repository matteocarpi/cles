import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import useResponsiveness from '../../hooks/useResponsiveness'

import SlidingImages from '../SlidingImages'
import AppearingText from '../AppearingText'

const Container = styled.section`
  margin-top: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 769px) {
    margin-top: 22vw;
    margin-bottom: 90px;
    padding: 0 40px;
  }
`

const Description = styled(motion.h3)``

const StyledSlidingImages = styled(SlidingImages)`
  align-self: center;
  width: 100%;
  @media (min-width: 769px) {
    align-self: flex-end;
    padding: 0;
  }
`

const Text = styled(AppearingText)`
  width: 100%;
  padding: 0 20px;
  max-width: 1000px;
  margin-top: 8px;

  @media (min-width: 769px) {
    align-self: flex-start;
    padding: 0;
  }
`

export default function PageIntro({
  text,
  graphic,
  image,
  reverseImages,
  graphicStyle,
  verticalAlignment,
  leftTranslate,
  customLines,
}) {
  const { isMobile } = useResponsiveness()

  return (
    <Container>
      <Text
        // eslint-disable-next-line no-nested-ternary
        maxStrLength={!customLines ? (isMobile ? 20 : 40) : null}
        component={Description}
        numberOfLines={customLines}
      >
        {text}
      </Text>
      <StyledSlidingImages
        graphic={graphic}
        image={image}
        reverse={reverseImages}
        graphicStyle={graphicStyle}
        verticalAlignment={verticalAlignment}
        leftTranslate={leftTranslate}
      />
    </Container>
  )
}
