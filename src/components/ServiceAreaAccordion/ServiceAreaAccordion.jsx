import React from 'react'
import styled from 'styled-components'
import { getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'

import MaskedImage from '../MaskedImage/MaskedImage'
import Accordion from '../Accordion/Accordion'

const Image = styled(MaskedImage)`
  margin: 24px 0;
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
  const { lang } = useLang()

  const image = getImage(immagine.localFile)

  return (
    <Accordion titolo={titolo}>
      <Image image={image} alt="" />

      <Description dangerouslySetInnerHTML={{ __html: descrizione[lang] }} />

      <ServiziList>
        {listaServizi.map(servizio => (
          <Servizio>
            <h5>{servizio[lang]}</h5>
          </Servizio>
        ))}
      </ServiziList>
    </Accordion>
  )
}
