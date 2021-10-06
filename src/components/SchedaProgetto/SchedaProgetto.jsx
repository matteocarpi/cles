import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import useLang from '../../hooks/useLang'
import {
  schedaProgettoTitles,
  areeDiLavoro as areeDiLavoroLabels,
} from '../../const'

const Container = styled.section`
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.gray};
`

const Titolo = styled.h6`
  margin-top: 20px;
`

const InfoWrapper = styled.article`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const InfoContainer = styled.article`
  margin-top: 20px;

  @media (min-width: 768px) {
    width: 50%;

    &:nth-child(3),
    &:nth-child(4) {
      margin-top: 40px;
    }
  }
`

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const Text = styled.div`
  p {
    margin: 0;
  }
`

const AreaDiLavoro = styled(Link)`
  color: ${({ theme }) => theme.red};
  text-decoration: underline;
  margin-right: 1rem;
`

export default function SchedaProgetto({
  titolo,
  committente,
  annoDiInizio,
  annoDiFine,
  serviziOfferti,
  areeDiLavoro,
}) {
  const { lang } = useLang()

  return (
    <Container>
      <Titolo>{titolo[lang]}</Titolo>

      <InfoWrapper>
        <InfoContainer>
          <Label>{schedaProgettoTitles.committente[lang]}</Label>
          <Text>{committente}</Text>
        </InfoContainer>

        <InfoContainer>
          <Label>{schedaProgettoTitles.anno[lang]}</Label>
          <Text>
            {annoDiInizio} - {annoDiFine}
          </Text>
        </InfoContainer>

        <InfoContainer>
          <Label>{schedaProgettoTitles.serviziOfferti[lang]}</Label>
          <Text dangerouslySetInnerHTML={{ __html: serviziOfferti[lang] }} />
        </InfoContainer>

        <InfoContainer>
          <Label>{schedaProgettoTitles.areeDiLavoro[lang]}</Label>
          {areeDiLavoro.map(area => (
            <AreaDiLavoro key={area} to="#">
              #{areeDiLavoroLabels[area][lang]}
            </AreaDiLavoro>
          ))}
        </InfoContainer>
      </InfoWrapper>
    </Container>
  )
}
