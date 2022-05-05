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
  //  width: 50%;
`

const ReducedInfoContainer = styled.article`
  margin-top: 20px;
  &:first-child {
    margin-top: ${({ reduced }) => reduced && '30px'};
  }
  width: 50%;
  padding-right: 30px;
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
    &:not(first-child) {
      margin-bottom: 1rem;
    }
  }

  ul {
    padding-top: 1rem;
    list-style: disc;
    margin-left: 2rem;
  }

  li {
    margin-bottom: 1rem;
    line-height: 1.5;
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

const PeriodInfoContainer = styled.article`
  margin-top: 20px;
  &:first-child {
    margin-top: ${({ reduced }) => reduced && '30px'};
  }
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* padding: 0 10px; */
`
const DownloadButton = styled.a`
  width: 180px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.yellow};
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PeriodText = styled.section``

const DetailsInfo = styled.div`
  padding-right: 30px;
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
        <DetailsInfo>
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
              <Text
                dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }}
              />
            </InfoContainer>
          )}

          <InfoContainer>
            <Label>{schedaProgettoTitles.paroleChiave[lang]}</Label>
            {paroleChiave?.map(area => (
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
        </DetailsInfo>
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
  pdf,
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
}) => {
  const pdfUrl = pdf?.localFile?.url

  return (
    <Container borderTop={borderTop}>
      <Titolo>{titolo[lang]}</Titolo>
      <InfoWrapper>
        <InfoHalf>
          <DetailsInfo>
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
                <Text
                  dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }}
                />
              </InfoContainer>
            )}

            <InfoContainer>
              <Label>{schedaProgettoTitles.paroleChiave[lang]}</Label>
              {paroleChiave?.map(area => (
                <ParoleChiave
                  key={area}
                  to={`${parentUrl[lang]}/${paroleChiaveLabels[area][lang]
                    .replaceAll(' ', '-')
                    .toLowerCase()}`}
                >
                  #{paroleChiaveLabels[area][lang]}
                </ParoleChiave>
              ))}
              <DownloadButton href={pdfUrl} target="_blank" download>
                DOWNLOAD
              </DownloadButton>
            </InfoContainer>
          </DetailsInfo>
        </InfoHalf>

        {!isMobile && (
          <InfoHalf>
            <InfoContainer>
              <Label>{schedaProgettoTitles.ruolo[lang]}</Label>
              <Text>{ruolo[lang]}</Text>
            </InfoContainer>

            <InfoContainer>
              <Label>{schedaProgettoTitles.serviziEAttività[lang]}</Label>
              <Text
                dangerouslySetInnerHTML={{ __html: serviziEAttivit[lang] }}
              />
            </InfoContainer>
          </InfoHalf>
        )}
      </InfoWrapper>
    </Container>
  )
}

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
