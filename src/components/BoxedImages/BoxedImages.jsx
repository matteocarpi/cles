import React from 'react'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BgImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'

import useResponsiveness from '../../hooks/useResponsiveness'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

// const mobileProportion = 0.54

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 26px;
  height: calc(840px * ${({ mobileProportion }) => mobileProportion});
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  transform: translateX(
    calc(-630px * ${({ mobileProportion }) => mobileProportion} / 2)
  );
`

const Front = styled.div`
  position: relative;
`

const Back = styled.div`
  position: relative;
  transform: translate(
    calc(90px * ${({ mobileProportion }) => mobileProportion}),
    calc(90px * ${({ mobileProportion }) => mobileProportion})
  );
`

const imageContainerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(500px * ${({ mobileProportion }) => mobileProportion});
  height: calc(700px * ${({ mobileProportion }) => mobileProportion});
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.yellow};
`

const Above = styled.div`
  ${imageContainerStyles}
`

const Below = styled.div`
  ${imageContainerStyles}
  width: calc(550px * ${({ mobileProportion }) => mobileProportion});
  height: calc(750px * ${({ mobileProportion }) => mobileProportion});
  clip-path: polygon(
    calc(500px * ${({ mobileProportion }) => mobileProportion}) 0,
    calc(550px * ${({ mobileProportion }) => mobileProportion})
      calc(50px * ${({ mobileProportion }) => mobileProportion}),
    calc(550px * ${({ mobileProportion }) => mobileProportion})
      calc(750px * ${({ mobileProportion }) => mobileProportion}),
    calc(50px * ${({ mobileProportion }) => mobileProportion})
      calc(750px * ${({ mobileProportion }) => mobileProportion}),
    0 calc(700px * ${({ mobileProportion }) => mobileProportion})
  );
`

const cornerStyles = css`
  position: absolute;
  width: calc(70px * ${({ mobileProportion }) => mobileProportion});
  height: 3px;
  background: gold;
  transform: rotate(45deg);
`

const CornerTop = styled.div`
  ${cornerStyles}
  top: calc(24px * ${({ mobileProportion }) => mobileProportion});
  left: calc(488px * ${({ mobileProportion }) => mobileProportion});
`
const CornerMiddle = styled.div`
  ${cornerStyles}
  top: calc(720px * ${({ mobileProportion }) => mobileProportion});
  left: calc(488px * ${({ mobileProportion }) => mobileProportion});
`
const CornerBottom = styled.div`
  ${cornerStyles}
  top: calc(720px * ${({ mobileProportion }) => mobileProportion});
  left: calc(-10px * ${({ mobileProportion }) => mobileProportion});
`

const Img = styled(BgImage)`
  height: 100%;
  width: 100%;
`

const Mask = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const StyledCarousel = styled(Carousel)`
  height: 100%;
  .carousel {
    height: 100%;
  }
  .control-dots {
    display: none;
  }

  .slider-wrapper {
    height: 100%;
    .slider {
      height: 100%;
    }
  }
`

export default function BoxedImages({ images, setCurrentIndex }) {
  const maskData = useStaticQuery(graphql`
    query ImageQuery {
      file(name: { eq: "mask-1" }) {
        id
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  const { isMobile } = useResponsiveness()

  const maskImage = getImage(maskData.file)

  const images1 = [...images.slice(1), images[0]]
  const images2 = [...images.slice(2), ...images.slice(0, 2)]
  const images3 = [...images.slice(3), ...images.slice(0, 3)]

  const carouselProps = {
    styles: { height: '100%' },
    infiniteLoop: true,
    autoPlay: true,
    showThumbs: false,
    showArrows: false,
    showStatus: false,
    onChange: index => setCurrentIndex(index),
    interval: 4000,
  }

  const mobileProportion = isMobile ? 0.54 : 0.8

  return (
    <>
      <Wrapper mobileProportion={mobileProportion}>
        <Container mobileProportion={mobileProportion}>
          <Back mobileProportion={mobileProportion}>
            <Below mobileProportion={mobileProportion}>
              <StyledCarousel
                {...carouselProps}
                mobileProportion={mobileProportion}
              >
                {images3.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                    mobileProportion={mobileProportion}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above mobileProportion={mobileProportion}>
              <StyledCarousel
                {...carouselProps}
                mobileProportion={mobileProportion}
              >
                {images2.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                    mobileProportion={mobileProportion}
                  />
                ))}
              </StyledCarousel>
            </Above>
            <CornerTop mobileProportion={mobileProportion} />
            <CornerMiddle mobileProportion={mobileProportion} />
            <CornerBottom mobileProportion={mobileProportion} />
          </Back>
          <Front mobileProportion={mobileProportion}>
            <Below mobileProportion={mobileProportion}>
              <StyledCarousel
                {...carouselProps}
                mobileProportion={mobileProportion}
              >
                {images1.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                    mobileProportion={mobileProportion}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above mobileProportion={mobileProportion}>
              <Mask
                alt=""
                image={maskImage}
                mobileProportion={mobileProportion}
              />
              <StyledCarousel
                {...carouselProps}
                mobileProportion={mobileProportion}
              >
                {images.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                    mobileProportion={mobileProportion}
                  />
                ))}
              </StyledCarousel>
            </Above>
            <CornerTop mobileProportion={mobileProportion} />
            <CornerMiddle mobileProportion={mobileProportion} />
            <CornerBottom mobileProportion={mobileProportion} />
          </Front>
        </Container>
      </Wrapper>
    </>
  )
}
