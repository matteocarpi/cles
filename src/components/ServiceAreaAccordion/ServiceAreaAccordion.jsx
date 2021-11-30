import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useLang from '../../hooks/useLang'

import Accordion from '../Accordion/Accordion'

const StyledAccordion = styled(Accordion)`
  width: 100%;
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

    @media (min-width: 768px) {
      article {
        border-bottom: 2px solid ${({ theme }) => theme.gray};
      }
    }
  }
`

const Description = styled.h5`
  padding: 20px 0;

  @media (min-width: 768px) {
    padding: 40px 0 60px 0;
  }
`

const ServiziList = styled.ul`
  margin: 20px 0;

  @media (min-width: 768px) {
    margin-bottom: 15px;
  }
`

const Servizio = styled.li`
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.gray};
`

export default function ServiceAreaAccordion({
  titolo,
  descrizione,
  listaServizi,
  expandedArea,
  setExpandedArea,
  id,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    if (expandedArea === titolo[lang]) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [expandedArea, lang, titolo])

  const handleExpansion = value => setExpandedArea(value ? titolo[lang] : null)

  return (
    <Wrapper isExpanded={isExpanded} id={id}>
      <StyledAccordion
        titolo={titolo}
        setIsExpanded={handleExpansion}
        parentExpanded={isExpanded}
      >
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
