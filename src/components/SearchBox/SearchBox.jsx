import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Input = styled.input``

export default function SearchBox({ setValue, setLoading }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setValue(query.toLowerCase())
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, setLoading, setValue])

  return (
    <Input
      onChange={e => setQuery(e.target.value)}
      value={query}
      placeholder="Search"
    />
  )
}
