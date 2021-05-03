import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import useElementInView from '../../hooks/useElementInView'

const Wrapper = styled.div``

const Container = styled.div``

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

  const wordsPerLine = Math.ceil(textArr.length / numberOfLines)

  const linesArr = Array.from(Array(numberOfLines).keys())

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

  return (
    <Wrapper ref={ref}>
      <Container>
        {linesArr.map((_, index) => {
          const start = wordsPerLine * index
          const end = start + wordsPerLine

          return (
            <TextContainer key={textArr[start]}>
              <Text variants={textVariants} initial="hidden" animate={controls}>
                {textArr.slice(start, end).map(word => `${word} `)}
              </Text>
            </TextContainer>
          )
        })}
      </Container>
    </Wrapper>
  )
}
