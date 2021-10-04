import React from 'react'
import styled, { css } from 'styled-components'

import Plus from '../../assets/plus.svg'
import Minus from '../../assets/minus.svg'

const Button = styled.button`
  width: 20px;
  height: 20px;
  @media (min-width: 769px) {
    width: 56px;
    height: 56px;
  }
`

const readMoreIconStyles = css`
  width: 20px;
  height: 20px;
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

export default function PlusButton({ onClick, active }) {
  return (
    <Button type="button" onClick={onClick}>
      {active ? <StyledMinus /> : <StyledPlus />}
    </Button>
  )
}
