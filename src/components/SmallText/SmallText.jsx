import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
`

export default function SmallText({ className, children }) {
  return <Text className={className}>{children}</Text>
}
