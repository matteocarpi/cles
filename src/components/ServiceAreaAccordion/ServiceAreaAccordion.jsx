import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'

import MaskedImage from '../MaskedImage/MaskedImage'
import Accordion from '../Accordion/Accordion'

const StyledAccordion = styled(Accordion)`
  width: 100%;
  @media (min-width: 768px) {
    width: calc(100% - 80px - 26vw);
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ isExpanded }) =>
    isExpanded ? 'space-between' : 'flex-end'};

  &:last-child {
    ${StyledAccordion} {
      header {
        border-bottom: 2px solid ${({ theme }) => theme.gray};
        padding-bottom: 20px;
      }
    }
  }
`

const MobileImage = styled(MaskedImage)`
  margin: 24px 0;

  @media (min-width: 768px) {
    display: none;
  }
`

const DesktopImage = styled(MaskedImage)``

const DesktopImageContainer = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: block;
  }
  position: sticky;
  top: 350px;
  width: 300px;
  height: 400px;
`

const Description = styled.h5`
  padding: 20px 0;
`

const ServiziList = styled.ul`
  margin: 20px 0;
`

const Servizio = styled.li`
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.gray};
`

export default function ServiceAreaAccordion({
  titolo,
  gallery,
  descrizione,
  listaServizi,
  expandedArea,
  setExpandedArea,
}) {
  const [index, setIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const { lang } = useLang()

  const image = getImage(gallery[index].localFile)

  useEffect(() => {
    if (expandedArea === titolo[lang]) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [expandedArea, lang, titolo])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isExpanded) {
        setIndex(i => (i === gallery.length - 1 ? 0 : i + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [gallery.length, isExpanded])

  const handleExpansion = value => setExpandedArea(value ? titolo[lang] : null)

  return (
    <Wrapper isExpanded={isExpanded}>
      {isExpanded && (
        <DesktopImageContainer>
          <DesktopImage image={image} alt="" />
        </DesktopImageContainer>
      )}
      <StyledAccordion
        titolo={titolo}
        setIsExpanded={handleExpansion}
        parentExpanded={isExpanded}
      >
        <MobileImage image={image} alt="" />

        <Description dangerouslySetInnerHTML={{ __html: descrizione[lang] }} />

        <ServiziList>
          {listaServizi.map(servizio => (
            <Servizio>
              <h5>{servizio[lang]}</h5>
            </Servizio>
          ))}
        </ServiziList>
      </StyledAccordion>
    </Wrapper>
  )
}
