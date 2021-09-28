import React from 'react'
import styled from 'styled-components'

import { GatsbyImage } from 'gatsby-plugin-image'

const Client = styled(GatsbyImage)`
  width: 45%;
  max-height: 50px;
  margin: 1rem 0;

  @media (min-width: 769px) {
    width: 30%;
    max-width: 250px;
    max-height: unset;
  }
`

export default function ClientLogo(props) {
  return <Client {...props} />
}
