import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import Check from '../../assets/check.svg'

const Container = styled.div`
  position: relative;
  display: flex;
  text-transform: uppercase;
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
  border: solid 2px white;
  margin-right: 10px;
  margin-bottom: 40px;
  flex-shrink: 0;
`

export default function FormCheckbox({ name, children }) {
  const [field, , helpers] = useField(name)

  return (
    <Container>
      <HiddenCheckbox
        type="checkbox"
        checked={field.value}
        onChange={() => helpers.setValue(!field.value)}
      />
      <StylishCheckbox>{field.value && <Check />}</StylishCheckbox>
      {children}
    </Container>
  )
}
