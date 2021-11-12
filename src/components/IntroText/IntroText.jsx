import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import useResponsiveness from '../../hooks/useResponsiveness'

import AppearingText from '../AppearingText'

const Description = styled(motion.h3)``

const Text = styled(AppearingText)`
  width: 100%;
  max-width: 1000px;
  margin-top: 8px;
  margin-bottom: 60px;
  @media (min-width: 769px) {
    margin-bottom: 90px;
    align-self: flex-start;
    padding: 0;
  }
`

export default function IntroText({ children }) {
  const { isMobile } = useResponsiveness()

  return (
    <Text maxStrLength={isMobile ? 25 : 40} component={Description}>
      {children}
    </Text>
  )
}
