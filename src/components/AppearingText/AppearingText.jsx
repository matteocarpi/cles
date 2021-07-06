import React, { useRef, useLayoutEffect, useMemo } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import useElementInView from '../../hooks/useElementInView'

const Wrapper = styled.div`
  overflow-y: hidden;
  overflow-x: visible;
`

const Container = styled.div`
  overflow-y: hidden;
  overflow-x: visible;
`

const TextContainer = styled.div`
  overflow-y: hidden;
  overflow-x: visible;
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

export default function AppearingText({
  children,
  numberOfLines = 2,
  component: Component = Text,
  className,
  maxStrLength,
}) {
  const textArr = children.split(' ')

  const wordsPerLine = Math.ceil(textArr.length / numberOfLines)

  const linesArr = Array.from(Array(numberOfLines).keys())

  const ref = useRef()

  const inView = useElementInView({ ref })

  const controls = useAnimation()

  const emptyLines =
    numberOfLines > textArr.length
      ? Array.from(Array(numberOfLines - textArr.length).keys())
      : Array(0)

  const emptyStrings = emptyLines.map(() => '_')

  const filledTextArr = useMemo(() => [...textArr, ...emptyStrings], [
    emptyStrings,
    textArr,
  ])

  const lines = useMemo(() => {
    let lineNumber = 0

    const obj = {}

    filledTextArr.forEach(word => {
      if (obj[lineNumber]?.length + word.length > maxStrLength) {
        lineNumber += 1
      }
      obj[lineNumber] = `${obj[lineNumber] ?? ''}${
        obj[lineNumber] ? ' ' : ''
      }${word}`
    })

    return Object.values(obj)
  }, [filledTextArr, maxStrLength])

  useLayoutEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  return (
    <Wrapper ref={ref} className={className}>
      <Container>
        {maxStrLength
          ? lines.map(line => (
              <TextContainer key={line}>
                <Component
                  variants={textVariants}
                  initial="hidden"
                  animate={controls}
                  style={{ marginBottom: '0.3rem' }}
                >
                  {line}
                </Component>
              </TextContainer>
            ))
          : linesArr.map((_, index) => {
              const start = wordsPerLine * index
              const end = start + wordsPerLine

              return (
                <TextContainer key={textArr[start]}>
                  <Component
                    variants={textVariants}
                    initial="hidden"
                    animate={controls}
                    style={{ marginBottom: '0.3rem' }}
                  >
                    {filledTextArr
                      .slice(start, end)
                      .map(word =>
                        word === '_' ? (
                          <span style={{ opacity: 0 }}>_</span>
                        ) : (
                          `${word} `
                        ),
                      )}
                  </Component>
                </TextContainer>
              )
            })}
      </Container>
    </Wrapper>
  )
}
