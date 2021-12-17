import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'

import { v4 as uuidv4 } from 'uuid'

import useLang from '../../hooks/useLang'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

import useResponsiveness from '../../hooks/useResponsiveness'

import SwiperPagination from '../SwiperPagination'

SwiperCore.use([Autoplay, Pagination])

const Container = styled.article`
  padding-bottom: 40px;
  margin-bottom: 30px;
  border-bottom: solid 2px ${({ theme }) => theme.gray};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const SwiperWrapper = styled.div`
  max-width: 900px;
  margin-left: auto;
`

const Title = styled.h6`
  text-transform: uppercase;
  margin-bottom: 40px;
`

const Logo = styled(GatsbyImage)`
  width: 100%;
  mix-blend-mode: multiply;
  @media (min-width: 768px) {
    width: 273px;
    height: 117px;
    margin-bottom: 15px;
  }
`

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 250px !important;
`

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`

export default function ClientSection({ titolo, loghi = [] }) {
  const [swiper, setSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const { lang } = useLang()
  const { isMobile } = useResponsiveness()

  const logos = useMemo(
    () => loghi?.map(l => l.localFile.childImageSharp.gatsbyImageData) ?? [],
    [loghi],
  )

  const rows = isMobile ? 3 : 2
  const slidesNumber = Math.ceil(logos.length / rows)

  const slides = useMemo(
    () =>
      Array.from(Array(slidesNumber).keys()).map(slide => ({
        id: uuidv4(),
        logos: Array.from(Array(rows).keys()).map(
          row =>
            slide * rows + row <= logos.length - 1 && {
              ...logos[slide * rows + row],
            },
        ),
      })),
    [logos, rows, slidesNumber],
  )

  return (
    <Container id={titolo[lang].replaceAll(' ', '').toLowerCase()}>
      <Header>
        <Title>{titolo[lang]}</Title>
        {!isMobile && (
          <SwiperPagination
            slides={slides}
            swiper={swiper}
            currentSlide={currentSlide}
          />
        )}
      </Header>

      <SwiperWrapper>
        <Swiper
          onSlideChangeTransitionEnd={s => setCurrentSlide(s.activeIndex)}
          onSwiper={setSwiper}
          slidesPerView={isMobile ? 2 : 3}
          spaceBetween={50}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay]}
          pagination
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <LogosContainer>
                {slide.logos.map(logo => (
                  <Logo
                    objectFit="contain"
                    objectPosition="50% 50%"
                    image={logo}
                    alt="client logo"
                  />
                ))}
              </LogosContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
      <PaginationContainer>
        {isMobile && (
          <SwiperPagination
            slides={slides}
            swiper={swiper}
            currentSlide={currentSlide}
          />
        )}
      </PaginationContainer>
    </Container>
  )
}
