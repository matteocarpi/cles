import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import useLang from '../../hooks/useLang'

import Plus from '../../assets/plus.svg'
import Minus from '../../assets/minus.svg'
import SectionTitleMobile from '../SectionTitleMobile'

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

const ReadMoreText = styled.span`
  color: ${({ theme }) => theme.yellow};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-decoration: underline;
`

const ReadMore = styled.button`
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: flex-end;

    ${ReadMoreText} {
      margin-right: 40px;
    }
  }
`

const readMoreIconStyles = css`
  @media (min-width: 768px) {
    width: 56px;
    height: 56px;
  }
`

const StyledPlus = styled(Plus)`
  ${readMoreIconStyles}
`

const StyledMinus = styled(Minus)`
  ${readMoreIconStyles}
`

const PageSection = React.forwardRef(
  ({ title, children, noCollapse, id }, ref) => {
    const [expanded, setExpanded] = useState(false)

    const { lang } = useLang()

    return (
      <Wrapper id={id} ref={ref}>
        <Container noCollapse={noCollapse} expanded={expanded}>
          <SectionTitleMobile>{title}</SectionTitleMobile>
          {children}
        </Container>
        {!noCollapse && (
          <ReadMore type="button" onClick={() => setExpanded(!expanded)}>
            <ReadMoreText>
              {!expanded && (lang === 'it' ? 'Leggi tutto' : 'Read more')}
              {expanded && (lang === 'it' ? 'Leggi meno' : 'Read less')}
            </ReadMoreText>
            {!expanded ? <StyledPlus /> : <StyledMinus />}
          </ReadMore>
        )}
      </Wrapper>
    )
  },
)

export default PageSection
