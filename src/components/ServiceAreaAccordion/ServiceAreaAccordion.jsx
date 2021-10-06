import React, { useState } from 'react'
import styled from 'styled-components'
import { getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'

import MaskedImage from '../MaskedImage/MaskedImage'
import Accordion from '../Accordion/Accordion'

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

const StyledAccordion = styled(Accordion)`
  width: 100%;
  @media (min-width: 768px) {
    width: calc(100% - 80px - 26vw);
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
  top: 400px;
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
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.gray};
`

export default function ServiceAreaAccordion({
  titolo,
  immagine,
  descrizione,
  listaServizi,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { lang } = useLang()

  const image = getImage(immagine.localFile)

  return (
    <Wrapper isExpanded={isExpanded}>
      {isExpanded && (
        <DesktopImageContainer>
          <DesktopImage image={image} alt="" />
        </DesktopImageContainer>
      )}
      <StyledAccordion titolo={titolo} setIsExpanded={setIsExpanded}>
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
