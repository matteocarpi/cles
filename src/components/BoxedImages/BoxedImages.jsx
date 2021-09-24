import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BgImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const mobile = 0.5
const desktop = 0.7
const bigScreen = 0.9

const Wrapper = styled.div`
  position: relative;
  margin-top: 56px;
  margin-bottom: 26px;
  height: calc(840px * ${mobile});
  display: flex;
  justify-content: flex-end;

  @media (min-width: 1100px) {
    height: calc(840px * ${desktop});
  }

  @media (min-width: 1681px) {
    height: calc(840px * ${bigScreen});
  }
`

const Container = styled.div`
  transform: translateX(calc(-1315px * ${mobile} / 2));
  @media (min-width: 1100px) {
    transform: translateX(calc(-1315px * ${desktop} / 2));
  }

  @media (min-width: 1681px) {
    transform: translateX(calc(-1260px * ${bigScreen} / 2));
  }
`

const Front = styled.div`
  position: relative;
`

const Back = styled.div`
  position: relative;
  transform: translate(calc(90px * ${mobile}), calc(90px * ${mobile}));
  @media (min-width: 1100px) {
    transform: translate(calc(90px * ${desktop}), calc(90px * ${desktop}));
  }

  @media (min-width: 1681px) {
    transform: translate(calc(90px * ${bigScreen}), calc(90px * ${bigScreen}));
  }
`

const imageContainerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(500px * ${mobile});
  height: calc(700px * ${mobile});
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.yellow};

  @media (min-width: 1100px) {
    width: calc(500px * ${desktop});
    height: calc(700px * ${desktop});
  }

  @media (min-width: 1681px) {
    width: calc(500px * ${bigScreen});
    height: calc(700px * ${bigScreen});
  }
`

const Above = styled.div`
  ${imageContainerStyles}
`

const Below = styled.div`
  ${imageContainerStyles}
  width: calc(550px * ${mobile});
  height: calc(750px * ${mobile});
  clip-path: polygon(
    calc(500px * ${mobile}) 1px,
    calc(550px * ${mobile}) calc(51px * ${mobile}),
    calc(550px * ${mobile}) calc(750px * ${mobile}),
    calc(50px * ${mobile}) calc(750px * ${mobile}),
    0 calc(700px * ${mobile})
  );

  @media (min-width: 1100px) {
    width: calc(550px * ${desktop});
    height: calc(750px * ${desktop});
    clip-path: polygon(
      calc(500px * ${desktop}) 1px,
      calc(550px * ${desktop}) calc(51px * ${desktop}),
      calc(550px * ${desktop}) calc(750px * ${desktop}),
      calc(50px * ${desktop}) calc(750px * ${desktop}),
      0 calc(700px * ${desktop})
    );
  }

  @media (min-width: 1681px) {
    width: calc(550px * ${bigScreen});
    height: calc(750px * ${bigScreen});
    clip-path: polygon(
      calc(500px * ${bigScreen}) 1px,
      calc(550px * ${bigScreen}) calc(51px * ${bigScreen}),
      calc(550px * ${bigScreen}) calc(750px * ${bigScreen}),
      calc(50px * ${bigScreen}) calc(750px * ${bigScreen}),
      0 calc(700px * ${bigScreen})
    );
  }
`

const cornerStyles = css`
  position: absolute;
  width: calc(70px * ${mobile});
  height: 3px;
  background: ${({ theme }) => theme.yellow};
  transform: rotate(45deg);

  @media (min-width: 1100px) {
    width: calc(70px * ${desktop});
  }

  @media (min-width: 1681px) {
    width: calc(70px * ${bigScreen});
  }
`
const top = 25
const left = 488

const CornerTop = styled.div`
  ${cornerStyles}
  top: calc(${top}px * ${mobile});
  left: calc(${left}px * ${mobile});
  @media (min-width: 1100px) {
    top: calc(${top}px * ${desktop});
    left: calc(${left}px * ${desktop});
  }

  @media (min-width: 1681px) {
    top: calc(${top}px * ${bigScreen});
    left: calc(${left}px * ${bigScreen});
  }
`
const CornerMiddle = styled.div`
  ${cornerStyles}

  top: calc(720px * ${mobile});
  left: calc(488px * ${mobile});
  @media (min-width: 1100px) {
    top: calc(720px * ${desktop});
    left: calc(488px * ${desktop});
  }

  @media (min-width: 1681px) {
    top: calc(720px * ${bigScreen});
    left: calc(488px * ${bigScreen});
  }
`
const CornerBottom = styled.div`
  ${cornerStyles}
  top: calc(720px * ${mobile});
  left: calc(-10px * ${mobile});
  @media (min-width: 1100px) {
    top: calc(720px * ${desktop});
    left: calc(-10px * ${desktop});
  }

  @media (min-width: 1681px) {
    top: calc(720px * ${bigScreen});
    left: calc(-10px * ${bigScreen});
  }
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

  const [currentSlide, setCurrentSlide] = useState(0)

  const maskImage = getImage(maskData.file)

  const images1 = [...images.slice(1), images[0]]
  const images2 = [...images.slice(2), ...images.slice(0, 2)]
  const images3 = [...images.slice(3), ...images.slice(0, 3)]

  const carouselProps = {
    styles: { height: '100%' },
    infiniteLoop: true,
    showThumbs: false,
    showArrows: false,
    showStatus: false,
  }

  return (
    <>
      <Wrapper>
        <Container>
          <Back>
            <Below>
              <StyledCarousel {...carouselProps} selectedItem={currentSlide}>
                {images3.map(image => (
                  <Img
                    key={image.childImageSharp.fluid.base64}
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above>
              <StyledCarousel {...carouselProps} selectedItem={currentSlide}>
                {images2.map(image => (
                  <Img
                    key={image.childImageSharp.fluid.base64}
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
              <StyledCarousel {...carouselProps} selectedItem={currentSlide}>
                {images1.map(image => (
                  <Img
                    key={image.childImageSharp.fluid.base64}
                    alt=""
                    fluid={image.childImageSharp.fluid}
                  />
                ))}
              </StyledCarousel>
            </Below>
            <Above>
              <Mask alt="" image={maskImage} />
              <StyledCarousel
                {...carouselProps}
                autoPlay
                interval={4000}
                onChange={index => {
                  setCurrentSlide(index)
                  setCurrentIndex(index)
                }}
              >
                {images.map(image => (
                  <Img
                    key={image.childImageSharp.fluid.base64}
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
