import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: min-content;
  display: flex;
  
`

const Button = styled.button`
  width: 10px;
  height: 10px;
  background-color: ${({ active, theme }) =>
    active ? theme.yellow : theme.gray};

  border-radius: 50%;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

export default function SwiperPagination({ slides, swiper, currentSlide }) {
  return (
    <Container>
      {slides.map(
        (s, index) =>
          index < slides.length - 2 && (
            <Button
              key={s.id}
              onClick={() => swiper.slideTo(index)}
              active={index === currentSlide}
            />
          ),
      )}
    </Container>
  )
}
