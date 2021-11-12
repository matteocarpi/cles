import React from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'

import Down from '../../assets/drop-down.svg'

const SelectContainer = styled.div`
  position: relative;
  margin: 60px 0;
`

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0;
  z-index: -1;
`

const Select = styled.select`
  width: 100%;
  color: ${({ theme }) => theme.black};
  padding-bottom: 25px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.yellow};
  margin-bottom: 25px;
  text-transform: uppercase;

  font-size: 16px;

  border-bottom-color: ${({ theme, error }) =>
    error ? theme.red : theme.black};
  color: ${({ theme, error }) => (error ? theme.red : theme.black)};

  &::placeholder {
    text-transform: uppercase;
    color: ${({ theme, error, light }) =>
      // eslint-disable-next-line no-nested-ternary
      error ? theme.red : light ? theme.gray : theme.black};
  }

  &:focus {
    outline: none;
  }

  ${({ light, theme, error }) =>
    light &&
    css`
      color: ${theme.gray};
      background-color: transparent;
      border-bottom-color: ${error ? theme.red : theme.gray}};
    `}

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export default function FormSelect({ name, options, placeholder, light }) {
  const [field, , helpers] = useField(name)

  return (
    <SelectContainer>
      <Select
        name={name}
        light={light}
        onChange={e => helpers.setValue(e.target.value)}
        value={field.value}
      >
        <option value="">{placeholder || 'Select'}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <ArrowContainer>
        <Down />
      </ArrowContainer>
    </SelectContainer>
  )
}
