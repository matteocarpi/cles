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

  @media (min-width: 769px) {
    margin: 40px 40px 0 40px;
  }
`

const Container = styled.section`
  border-top: solid 2px ${({ theme }) => theme.gray};
  /* max-height: 500px; */
  overflow-y: hidden;
  width: 100%;
  ${({ expanded, noCollapse }) =>
    (expanded || noCollapse) &&
    css`
      max-height: unset;
      overflow-y: unset;
    `}

  ${({ noSeparator }) =>
    noSeparator &&
    css`
      border: none;
    `}
    
  @media (min-width: 769px) {
    box-sizing: border-box;
    width: calc(100% - 80px - 26vw);
    align-self: flex-end;
    ${({ noSeparatorDesktop }) =>
      noSeparatorDesktop &&
      css`
        border: none;
      `}

    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
      `}
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

  @media (min-width: 769px) {
    justify-content: flex-end;
    margin-bottom: 0;
    ${ReadMoreText} {
      margin-right: 40px;
    }
  }
`

const readMoreIconStyles = css`
  @media (min-width: 769px) {
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
  (
    {
      title,
      children,
      noCollapse,
      noSeparator,
      noSeparatorDesktop,
      id,
      fullWidth,
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false)

    const { lang } = useLang()

    return (
      <Wrapper id={id} ref={ref}>
        <Container
          noCollapse={noCollapse}
          noSeparator={noSeparator}
          noSeparatorDesktop={noSeparatorDesktop}
          expanded={expanded}
          fullWidth={fullWidth}
        >
          <SectionTitleMobile>{title}</SectionTitleMobile>
          {noCollapse || expanded ? children : children[0]}
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
