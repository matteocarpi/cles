import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import useLang from '../../hooks/useLang'

import PlusButton from '../PlusButton'

const Container = styled.article`
  box-sizing: border-box;
  border-top: 2px solid ${({ theme }) => theme.gray};
  padding: 20px 0;
  &:last-child {
    border-bottom: 2px solid ${({ theme }) => theme.gray};
  }
`
const StyledPlusButton = styled(PlusButton)`
  transform: translateY(3px);
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const Expanded = styled.div`
  box-sizing: border-box;
`

const Title = styled.h3`
  margin: 0;
`

export default function Accordion({
  titolo,
  className,
  setIsExpanded = () => {},
  children,
  parentExpanded = null,
}) {
  const { lang } = useLang()

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (parentExpanded != null) setExpanded(parentExpanded)
  }, [parentExpanded])

  return (
    <Container className={className}>
      <Header>
        <Title>{titolo[lang]}</Title>
        <StyledPlusButton
          onClick={() =>
            setExpanded(isExpanded => {
              setIsExpanded(!isExpanded)
              return !isExpanded
            })
          }
          active={expanded}
        />
      </Header>

      {expanded && <Expanded>{children}</Expanded>}
    </Container>
  )
}
