import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  overflow: hidden;
`

const TextContainer = styled.div`
  overflow: hidden;
`

const Text = styled(motion.h1)``

const textVariants = {
  hidden: {
    translateY: '100%',
  },
  visible: {
    translateY: 0,
    transition: {
      duration: 0.7,
    },
  },
}

export default function AppearingText({ children, numberOfLines = 2 }) {
  const textArr = children.split(' ')

  const wordsPerLine = textArr.length / numberOfLines

  const linesArr = Array.from(Array(numberOfLines).keys())

  return (
    <Container>
      {linesArr.map((_, index) => {
        const start = wordsPerLine * index
        const end = start + wordsPerLine
        return (
          <TextContainer key={textArr[start]}>
            <Text variants={textVariants} initial="hidden" animate="visible">
              {textArr.slice(start, end).map(word => `${word} `)}
            </Text>
          </TextContainer>
        )
      })}
    </Container>
  )
}
