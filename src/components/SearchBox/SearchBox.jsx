import React, { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'

import Loupe from '../../assets/loupe.svg'

const Container = styled.div`
  position: relative;
  margin: 40px 0 10px 0;
`

const Input = styled.input`
  background-color: transparent;
  width: 100%;
  height: 56px;
  padding-left: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.gray};
  border: solid 2px ${({ theme }) => theme.gray};

  transition: 0.3s;
  ${({ focused }) =>
    focused &&
    css`
      border-top: solid 2px rgba(0, 0, 0, 0);
      border-right: solid 2px rgba(0, 0, 0, 0);
      border-left: solid 2px rgba(0, 0, 0, 0);
      padding-top: 2px;
      padding-left: 0;
      transition: 0.3s;
    `}

  &:focus {
    outline: none;
  }
`

const LoupeContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
`

export default function SearchBox({ setValue, setLoading }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const searching = useMemo(() => focused || hovered, [focused, hovered])

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setValue(query.toLowerCase())
      setLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [query, setLoading, setValue])

  return (
    <Container>
      <Input
        focused={searching}
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder="SEARCH"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <LoupeContainer>
        <Loupe />
      </LoupeContainer>
    </Container>
  )
}
