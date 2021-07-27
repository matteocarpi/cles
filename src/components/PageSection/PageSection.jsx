import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import useLang from '../../hooks/useLang'

import Plus from '../../assets/plus.svg'
import Minus from '../../assets/minus.svg'
import SectionTitleMobile from '../SectionTitleMobile'
import SectionTitle from '../SectionTitle'

const Wrapper = styled.section`
  margin: 0 24px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin: 96px 40px 0 40px;
  }
`

const Container = styled.section`
  border-top: solid 2px ${({ theme }) => theme.gray};
  max-height: 500px;
  overflow-y: hidden;

  ${({ expanded, noCollapse }) =>
    (expanded || noCollapse) &&
    css`
      max-height: unset;
    `}

  @media (min-width: 768px) {
    width: 71%;
    padding-top: 96px;
    align-self: flex-end;
  }
`

const ReadMore = styled.button`
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.yellow};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-decoration: underline;
`

export default function PageSection({ title, children, noCollapse, id }) {
  const [expanded, setExpanded] = useState(false)

  const { lang } = useLang()

  return (
    <Wrapper id={id}>
      <Container noCollapse={noCollapse} expanded={expanded}>
        <SectionTitleMobile>{title}</SectionTitleMobile>
        {children}
      </Container>
      {!noCollapse && (
        <ReadMore type="button" onClick={() => setExpanded(!expanded)}>
          {!expanded && (lang === 'it' ? 'Leggi tutto' : 'Read more')}
          {expanded && (lang === 'it' ? 'Leggi meno' : 'Read less')}
          {!expanded ? <Plus /> : <Minus />}
        </ReadMore>
      )}
    </Wrapper>
  )
}
