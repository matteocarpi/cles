import React from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'

import Check from '../../assets/check.svg'

const Container = styled.div`
  position: relative;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  ${({ theme, error }) =>
    error &&
    css`
      border: solid 1px ${theme.red};
    `}
`

const HiddenCheckbox = styled.input`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`

const StylishCheckbox = styled.div`
  width: 35px;
  height: 35px;
  border: ${({ dark, theme }) => `solid 2px ${dark ? theme.yellow : 'white'}`};
  margin-right: 10px;
  flex-shrink: 0;

  ${({ dark, theme }) =>
    dark &&
    css`
      svg {
        path {
          stroke: ${theme.yellow};
        }
      }
    `}
`

export default function FormCheckbox({ name, children, dark = false }) {
  const [field, , helpers] = useField(name)

  return (
    <Container>
      <HiddenCheckbox
        type="checkbox"
        checked={field.value}
        onChange={() => helpers.setValue(!field.value)}
      />
      <StylishCheckbox dark={dark}>{field.value && <Check />}</StylishCheckbox>
      {children}
    </Container>
  )
}
