import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import useLang from '../../hooks/useLang'
import {
  schedaProgettoTitles,
  paroleChiave as paroleChiaveLabels,
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

const ParoleChiave = styled(Link)`
  color: ${({ theme }) => theme.red};
  text-decoration: underline;
  margin-right: 1rem;

  &:visited {
    color: ${({ theme }) => theme.red};
  }
`

const OpenProject = ({
  titolo,
  committente,
  ruolo,
  annoDiInizio,
  annoDiFine,
  serviziEAttivit,
  paroleChiave,
  lang,
  parentUrl,
}) => (
  <Container>
    <Titolo>{titolo[lang]}</Titolo>

    <InfoWrapper>
      <InfoContainer>
        <Label>{schedaProgettoTitles.committente[lang]}</Label>
        <Text>{committente}</Text>
      </InfoContainer>

      <InfoContainer>
        <Label>{schedaProgettoTitles.ruolo[lang]}</Label>
        <Text>{ruolo[lang]}</Text>
      </InfoContainer>

      <InfoContainer>
        <Label>{schedaProgettoTitles.periodo[lang]}</Label>
        <Text>
          {annoDiInizio} - {annoDiFine}
        </Text>
      </InfoContainer>

      <InfoContainer>
        <Label>{schedaProgettoTitles.serviziEAttività[lang]}</Label>
        <Text dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }} />
      </InfoContainer>

      <InfoContainer>
        <Label>{schedaProgettoTitles.paroleChiave[lang]}</Label>
        {paroleChiave.map(area => (
          <ParoleChiave
            key={area}
            to={`${parentUrl[lang]}/${paroleChiaveLabels[area][lang]
              .replace(' ', '-')
              .toLowerCase()}`}
          >
            #{paroleChiaveLabels[area][lang]}
          </ParoleChiave>
        ))}
      </InfoContainer>
    </InfoWrapper>
  </Container>
)

const ClosedProject = ({
  titolo,
  committente,
  annoDiInizio,
  annoDiFine,
  lang,
}) => (
  <Container>
    <Titolo>{titolo[lang]}</Titolo>

    <InfoWrapper>
      <InfoContainer>
        <Label>{schedaProgettoTitles.committente[lang]}</Label>
        <Text>{committente}</Text>
      </InfoContainer>

      <InfoContainer>
        <Label>{schedaProgettoTitles.periodo[lang]}</Label>
        <Text>
          {annoDiInizio} - {annoDiFine}
        </Text>
      </InfoContainer>
    </InfoWrapper>
  </Container>
)

export default function SchedaProgetto(props) {
  const { statoProgetto, annoDiFine } = props

  const { lang } = useLang()

  const parentUrl =
    statoProgetto === 'aperto'
      ? {
          it: '/progetti-in-corso',
          en: '/ongoing-projects',
        }
      : {
          it:
            annoDiFine <= 2015
              ? '/progetti-chiusi-prima-del-2016'
              : '/progetti-chiusi-dopo-il-2016',
          en:
            annoDiFine <= 2015
              ? '/closed-projects-before-2016'
              : '/closed-projects-after-2016',
        }

  return statoProgetto === 'aperto' ? (
    <OpenProject {...props} lang={lang} parentUrl={parentUrl} />
  ) : (
    <ClosedProject {...props} lang={lang} parentUrl={parentUrl} />
  )
}
