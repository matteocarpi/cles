import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  iframe {
    height: 300px;

    @media (min-width: 768px) {
      height: 505px;
      margin: 40px 0;
    }

    @media (min-width: 900px) {
      height: 505px;
      margin: 100px 0 56px 0;
    }
  }
`

export default function Video({ url }) {
  const splitUrl = url.split('/')

  const code = splitUrl[splitUrl.length - 1]
  return (
    <Container>
      <iframe
        title="video"
        src={`https://player.vimeo.com/video/${code}`}
        width="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </Container>
  )
}
