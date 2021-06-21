import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  margin-top: 30px;
  margin-bottom: 60px;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
`

export default function MenuItem({ className, children }) {
  return <Text className={className}>{children}</Text>
}
