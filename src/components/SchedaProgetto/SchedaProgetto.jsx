import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import useLang from '../../hooks/useLang'
import useResponsiveness from '../../hooks/useResponsiveness'
import {
  schedaProgettoTitles,
  paroleChiave as paroleChiaveLabels,
} from '../../const'

const Container = styled.section`
  margin: 20px 0 40px 0;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.gray};
  }

  &:first-child {
    border-top: ${({ borderTop, theme }) =>
      borderTop && `1px solid ${theme.gray}`};
  }
`

const Titolo = styled.h6`
  margin-top: 30px;

  @media (min-width: 768px) {
    margin-top: 40px;
    margin-bottom: 10px;
  }
`

const InfoWrapper = styled.article`
  @media (min-width: 768px) {
    display: flex;
  }
`

const InfoHalf = styled.div`
  @media (min-width: 768px) {
    width: 50%;
  }
`

const InfoContainer = styled.article`
  margin-top: 20px;
  &:first-child {
    margin-top: ${({ reduced }) => reduced && '30px'};
  }
  /* width: 50%; */
`

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
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

const DetailedProject = ({
  titolo,
  committente,
  ruolo,
  annoDiInizio,
  annoDiFine,
  serviziEAttivit,
  paroleChiave,
  lang,
  parentUrl,
  isMobile,
  borderTop,
}) => (
  <Container borderTop={borderTop}>
    <Titolo>{titolo[lang]}</Titolo>

    <InfoWrapper>
      <InfoHalf>
        <InfoContainer>
          <Label>{schedaProgettoTitles.committente[lang]}</Label>
          <Text>{committente}</Text>
        </InfoContainer>

        {isMobile && (
          <InfoContainer>
            <Label>{schedaProgettoTitles.ruolo[lang]}</Label>
            <Text>{ruolo[lang]}</Text>
          </InfoContainer>
        )}

        <InfoContainer>
          <Label>{schedaProgettoTitles.periodo[lang]}</Label>
          <Text>
            {annoDiInizio} - {annoDiFine}
          </Text>
        </InfoContainer>

        {isMobile && (
          <InfoContainer>
            <Label>{schedaProgettoTitles.serviziEAttività[lang]}</Label>
            <Text dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }} />
          </InfoContainer>
        )}

        <InfoContainer>
          <Label>{schedaProgettoTitles.paroleChiave[lang]}</Label>
          {paroleChiave.map(area => (
            <ParoleChiave
              key={area}
              to={`${parentUrl[lang]}/${paroleChiaveLabels[area][lang]
                .replaceAll(' ', '-')
                .toLowerCase()}`}
            >
              #{paroleChiaveLabels[area][lang]}
            </ParoleChiave>
          ))}
        </InfoContainer>
      </InfoHalf>

      {!isMobile && (
        <InfoHalf>
          <InfoContainer>
            <Label>{schedaProgettoTitles.ruolo[lang]}</Label>
            <Text>{ruolo[lang]}</Text>
          </InfoContainer>

          <InfoContainer>
            <Label>{schedaProgettoTitles.serviziEAttività[lang]}</Label>
            <Text dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }} />
          </InfoContainer>
        </InfoHalf>
      )}
    </InfoWrapper>
  </Container>
)

const ReducedProject = ({
  titolo,
  committente,
  annoDiInizio,
  annoDiFine,
  lang,
  borderTop,
}) => (
  <Container borderTop={borderTop}>
    <Titolo>{titolo[lang]}</Titolo>

    <InfoWrapper>
      <InfoContainer>
        <Label>{schedaProgettoTitles.committente[lang]}</Label>
        <Text>{committente}</Text>
      </InfoContainer>

      <InfoContainer reduced>
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

  const { isMobile } = useResponsiveness()

  const parentUrl =
    statoProgetto === 'aperto'
      ? {
          it: '/progetti-in-corso',
          en: '/ongoing-projects',
        }
      : {
          it:
            annoDiFine <= 2015
              ? '/progetti-chiusi-prima-del-2015'
              : '/progetti-chiusi-dopo-il-2015',
          en:
            annoDiFine <= 2015
              ? '/closed-projects-before-2015'
              : '/closed-projects-after-2015',
        }

  return annoDiFine >= 2015 ? (
    <DetailedProject
      {...props}
      lang={lang}
      parentUrl={parentUrl}
      isMobile={isMobile}
    />
  ) : (
    <ReducedProject
      {...props}
      lang={lang}
      parentUrl={parentUrl}
      isMobile={isMobile}
    />
  )
}
