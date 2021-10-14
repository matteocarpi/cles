import React from 'react'
import styled from 'styled-components'
import ReactScrollSpy from 'react-scrollspy'
import useScrollPosition from '@react-hook/window-scroll'
import useLang from '../../hooks/useLang'
import useViewportHeight from '../../hooks/useViewportHeight'

import SectionTitle from '../SectionTitle'

const ScrollSpyContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`

const SectionTitleWrapper = styled.div`
  overflow: hidden;

  &.section-title {
    .title {
      display: none;
    }
  }

  &.active {
    .title {
      display: block;
      animation: fadeIn 0.3s ease-in-out;
    }
  }

  @keyframes fadeIn {
    0% {
      transform: translateY(150px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

export default function ScrollSpy({
  firstSectionTop,
  offset = 0,
  sections = [],
  firstOffset = 0,
  titleComponent: Title = SectionTitle,
}) {
  const { lang } = useLang()

  const scrollY = useScrollPosition(60 /* fps */)

  const viewPortHeight = useViewportHeight()

  return (
    scrollY + viewPortHeight + firstOffset >= firstSectionTop && (
      <ScrollSpyContainer>
        <ReactScrollSpy
          items={sections.map(section => section.id)}
          currentClassName="active"
          offset={offset}
        >
          {sections.map(section => (
            <SectionTitleWrapper key={section.id} className="section-title">
              <Title className="title" light={section.isLight}>
                {section.label[lang]}
              </Title>
            </SectionTitleWrapper>
          ))}
        </ReactScrollSpy>
      </ScrollSpyContainer>
    )
  )
}
