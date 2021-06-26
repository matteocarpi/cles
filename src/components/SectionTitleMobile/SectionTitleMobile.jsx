import React from 'react'
import styled from 'styled-components'
import MenuText from '../MenuText'

const Text = styled(MenuText)`
  @media (min-width: 768px) {
    display: none;
  }
`
export default function SectionTitleMobile({ children }) {
  return <Text>{children}</Text>
}
