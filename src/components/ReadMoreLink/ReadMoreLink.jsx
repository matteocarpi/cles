import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import Plus from '../../assets/plus.svg'
import useLang from '../../hooks/useLang'

const ReadMoreText = styled.span`
  color: ${({ theme }) => theme.yellow};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-decoration: underline;
`

const ReadMore = styled(Link)`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    justify-content: flex-end;

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

export default function ReadMoreLink({ to }) {
  const { lang } = useLang()
  
  return (
    <ReadMore to={to}>
      <ReadMoreText>{lang === 'it' ? 'Leggi tutto' : 'Read more'}</ReadMoreText>
      <StyledPlus />
    </ReadMore>
  )
}
