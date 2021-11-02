import React, { useMemo } from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'

import { v4 as uuidv4 } from 'uuid'

import useLang from '../../hooks/useLang'

import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay])

const Container = styled.article`
  padding-bottom: 40px;
  margin-bottom: 30px;
  border-bottom: solid 2px ${({ theme }) => theme.gray};
`

const Title = styled.h6`
  text-transform: uppercase;
  margin-bottom: 40px;
`

const Logo = styled(GatsbyImage)`
  width: 100%;
`

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 250px !important;
`

export default function ClientSection({ titolo, loghi = [] }) {
  const { lang } = useLang()

  const logos = useMemo(
    () => loghi?.map(l => l.localFile.childImageSharp.gatsbyImageData) ?? [],
    [loghi],
  )

  const slidesNumber = Math.ceil(logos.length / 3)

  const slides = useMemo(
    () =>
      Array.from(Array(slidesNumber).keys()).map(slide => ({
        id: uuidv4(),
        0: logos[slide * 3],
        1: logos[slide * 3 + 1],
        2: logos[slide * 3 + 2],
      })),
    [logos, slidesNumber],
  )

  return (
    <Container>
      <Title>{titolo[lang]}</Title>

      <Swiper
        slidesPerView={2}
        spaceBetween={50}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <LogosContainer>
              {slide[0] && (
                <Logo
                  objectFit="contain"
                  objectPosition="50% 50%"
                  image={slide[0]}
                />
              )}
              {slide[1] && (
                <Logo
                  objectFit="contain"
                  objectPosition="50% 50%"
                  image={slide[1]}
                />
              )}
              {slide[2] && (
                <Logo
                  objectFit="contain"
                  objectPosition="50% 50%"
                  image={slide[2]}
                />
              )}
            </LogosContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
