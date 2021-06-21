import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const Container = styled.div`
  div {
    width: 100% !important;
  }
`

export default function Video({ url, className }) {
  return (
    <Container className={className}>
      <ReactPlayer url={url} />
    </Container>
  )
}
