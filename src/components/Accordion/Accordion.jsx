import React, { useState } from 'react'
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Expanded = styled.div`
  box-sizing: border-box;
`

const Title = styled.h3`
  margin: 0;
`

export default function Accordion({ titolo, children }) {
  const { lang } = useLang()

  const [expanded, setExpanded] = useState(false)

  return (
    <Container>
      <Header>
        <Title>{titolo[lang]}</Title>
        <PlusButton
          onClick={() => setExpanded(isExpanded => !isExpanded)}
          active={expanded}
        />
      </Header>

      {expanded && <Expanded>{children}</Expanded>}
    </Container>
  )
}
