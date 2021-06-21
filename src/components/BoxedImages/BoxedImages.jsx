import React from 'react'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BgImage from 'gatsby-background-image'

import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const mobileProportion = 0.54

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 26px;
  height: calc(840px * ${mobileProportion});
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  transform: translateX(calc(-630px * ${mobileProportion} / 2));
`

const Front = styled.div`
  position: relative;
`

const Back = styled.div`
  position: relative;
  transform: translate(
    calc(90px * ${mobileProportion}),
    calc(90px * ${mobileProportion})
  );
`

const imageContainerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(500px * ${mobileProportion});
  height: calc(700px * ${mobileProportion});
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.yellow};
`

const Above = styled.div`
  ${imageContainerStyles}
`

const Below = styled.div`
  ${imageContainerStyles}
  width: calc(550px * ${mobileProportion});
  height: calc(750px * ${mobileProportion});
  clip-path: polygon(
    calc(500px * ${mobileProportion}) 0,
    calc(550px * ${mobileProportion}) calc(50px * ${mobileProportion}),
    calc(550px * ${mobileProportion}) calc(750px * ${mobileProportion}),
    calc(50px * ${mobileProportion}) calc(750px * ${mobileProportion}),
    0 calc(700px * ${mobileProportion})
  );
`

const cornerStyles = css`
  position: absolute;
  width: calc(70px * ${mobileProportion});
  height: 3px;
  background: gold;
  transform: rotate(45deg);
`

const CornerTop = styled.div`
  ${cornerStyles}
  top: calc(24px * ${mobileProportion});
  left: calc(488px * ${mobileProportion});
`
const CornerMiddle = styled.div`
  ${cornerStyles}
  top: calc(720px * ${mobileProportion});
  left: calc(488px * ${mobileProportion});
`
const CornerBottom = styled.div`
  ${cornerStyles}
  top: calc(720px * ${mobileProportion});
  left: calc(-10px * ${mobileProportion});
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
  return (
    <>
      <Wrapper>
        <Container>
          <Back>
            <Below>
              <StyledCarousel {...carouselProps}>
                {images3.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above>
              <StyledCarousel {...carouselProps}>
                {images2.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Above>
            <CornerTop />
            <CornerMiddle />
            <CornerBottom />
          </Back>
          <Front>
            <Below>
              <StyledCarousel {...carouselProps}>
                {images1.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above>
              <Mask alt="" image={maskImage} />
              <StyledCarousel {...carouselProps}>
                {images.map(image => (
                  <Img
                    key="fsdfsd"
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Above>
            <CornerTop />
            <CornerMiddle />
            <CornerBottom />
          </Front>
        </Container>
      </Wrapper>
    </>
  )
}
