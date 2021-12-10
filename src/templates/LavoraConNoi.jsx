import React, { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { graphql } from 'gatsby'
import { workWithUsLabels } from '../const'

import Layout from '../components/Layout'
import MenuText from '../components/MenuText'
import FormFilePicker from '../components/FormFilePicker'
import FormSubmit from '../components/FormSubmit'
import FormInput from '../components/FormInput/FormInput'
import FormCheckbox from '../components/FormCheckbox'
import FormSelect from '../components/FormSelect'
import Link from '../components/Link'
import IntroText from '../components/IntroText'
import SmallText from '../components/SmallText'

const Container = styled.main`
  margin-top: 124px;
  padding: 20px;

  @media (min-width: 768px) {
    margin-top: calc(22vw + 30px);
    margin-bottom: 90px;
    padding: 0 40px;
  }
`

const SectionWrapper = styled.section`
  @media (min-width: 768px) {
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const SectionTitle = styled(MenuText)`
  margin-top: 30px;

  @media (min-width: 768px) {
    font-size: 32px;
    text-transform: none;
    margin: 0;
    position: sticky;
    top: calc(22vw + 20px);
  }
`

const SectionContent = styled.article`
  max-width: 900px;
`

const Info = styled.p`
  margin-bottom: 40px;
`

const FormTitle = styled.h6`
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 700;
`

const SubmissionMessage = styled.p`
  margin-top: 15px;

  ${({ error, theme }) =>
    error &&
    css`
      color: ${theme.red};
    `}
  ${({ success, theme }) =>
    success &&
    css`
      color: ${theme.green};
    `};
`

const PositionsList = styled.section`
  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
`

const PositionContainer = styled.article`
  border-bottom: solid 2px ${({ theme }) => theme.yellow};
  margin-bottom: 30px;
`

const PositionTitle = styled.h6`
  font-weight: 600;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`

const PositionDetails = styled.div`
  margin-bottom: 30px;
  p {
    margin: 0;
    padding: 0;
  }
`

const InfosWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    max-width: 520px;
    margin-top: 30px;
  }
`

const InfoContainer = styled.div`
  margin-bottom: 30px;
`

const InfoLabel = styled(SmallText)`
  @media (min-width: 768px) {
    font-size: 16px;
  }
`

const InfoContent = styled.p`
  margin-bottom: 0px;
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 16px;
    margin-top: 15px;
  }
`

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default function Policies({ pageContext, data: pageData }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const { lang, location, parentUrl } = pageContext

  const { title } = pageData.wpPage

  const { lavoraConNoiData } = pageData.wpPage

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    domicile: Yup.string().required(),
    titleOfStudy: Yup.string().required(),
    yearsOfExperience: Yup.number().required(),
    telephone: Yup.string().matches(phoneRegExp).required(),
    email: Yup.string().email().required(),
    position: Yup.string(),
    privacyAcceptance: Yup.boolean().oneOf([true]),
    cv: Yup.mixed().test('fileSize', 'Check the file', value => {
      if (!value) return false // attachment is optional
      return value.size <= 2000000
    }),
  })

  const initialValues = {
    fullName: '',
    domicile: '',
    titleOfStudy: '',
    yearsOfExperience: '',
    telephone: '',
    email: '',
    position: '',
    privacyAcceptance: false,
    cv: '',
  }

  const positionOptions = useMemo(
    () =>
      lavoraConNoiData.posizioniAperte.posizioni.map(p => ({
        label: p.nomePosizione[lang],
        value: p.nomePosizione[lang],
      })),
    [lang, lavoraConNoiData.posizioniAperte.posizioni],
  )

  const handleSubmit = async (values, { resetForm }) => {
    const {
      fullName,
      domicile,
      titleOfStudy,
      yearsOfExperience,
      telephone,
      email,
      position,
    } = values

    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Basic ${process.env.MAILGUN_TOKEN}`)

    const formdata = new FormData()
    formdata.append(
      'from',
      `Cles Website <cles-website@${process.env.MAILGUN_URL}>`,
    )

    const content = `
      Nome e Cognome: ${fullName} \n\n
      Domicilio: ${domicile} \n\n
      Titolo di studio: ${titleOfStudy} \n\n
      Anni di esperienza: ${yearsOfExperience} \n\n
      Telefono: ${telephone} \n\n
      Email: ${email} \n\n
      Posizione: ${position.length ? position : 'Candidatura libera'} \n\n
    `

    formdata.append('to', 'matteocarpi@hacari.com')
    formdata.append('subject', 'Nuova candidatura dal sito Cles')
    formdata.append('text', content)
    formdata.append('attachment', values.cv)
    formdata.append('h:Reply-To', `${fullName} <${email}>`)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    try {
      await fetch(
        `https://api.mailgun.net/v3/${process.env.MAILGUN_URL}/messages`,
        requestOptions,
      )

      setSuccess(true)
      resetForm()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed senging email')
      setError(true)
    }
  }

  return (
    <Layout
      lang={lang}
      location={location}
      title={title}
      parentUrl={parentUrl}
      noFooter
    >
      <Container>
        <IntroText>{lavoraConNoiData.tetolo[lang]}</IntroText>

        <SectionWrapper>
          <SectionTitle>
            {lavoraConNoiData.posizioniAperte.titolo[lang]}
          </SectionTitle>
          <SectionContent>
            <PositionsList>
              {lavoraConNoiData.posizioniAperte.posizioni.map(p => (
                <PositionContainer>
                  <PositionTitle>{p.nomePosizione[lang]}</PositionTitle>
                  {p.dettagli[lang] && (
                    <PositionDetails
                      dangerouslySetInnerHTML={{ __html: p.dettagli[lang] }}
                    />
                  )}
                  <InfosWrapper>
                    <InfoContainer>
                      <InfoLabel>
                        {{ it: 'Tipo di contratto', en: 'Contract' }[lang]}
                      </InfoLabel>
                      <InfoContent>{p.contratto[lang]}</InfoContent>
                    </InfoContainer>
                    <InfoContainer>
                      <InfoLabel>
                        {{ it: 'Sede', en: 'Location' }[lang]}
                      </InfoLabel>
                      <InfoContent>{p.sede[lang]}</InfoContent>
                    </InfoContainer>
                  </InfosWrapper>
                </PositionContainer>
              ))}
            </PositionsList>
          </SectionContent>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>{lavoraConNoiData.form.tetolo[lang]}</SectionTitle>
          <SectionContent>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validateOnChange
            >
              <Form>
                <FormInput
                  name="fullName"
                  placeholder={workWithUsLabels.fullName[lang]}
                  light
                />
                <FormInput
                  name="domicile"
                  placeholder={workWithUsLabels.domicile[lang]}
                  light
                />
                <FormInput
                  name="titleOfStudy"
                  placeholder={workWithUsLabels.titleOfStudy[lang]}
                  light
                />
                <FormInput
                  name="yearsOfExperience"
                  placeholder={workWithUsLabels.yearsOfExperience[lang]}
                  light
                  type="number"
                />
                <FormInput
                  name="telephone"
                  placeholder={workWithUsLabels.telephone[lang]}
                  light
                  type="tel"
                />
                <FormInput
                  name="email"
                  placeholder={workWithUsLabels.email[lang]}
                  light
                  type="email"
                />
                <FormSelect
                  options={positionOptions}
                  name="position"
                  placeholder={workWithUsLabels.posizione[lang]}
                  light
                />
                <FormFilePicker name="cv" />
                <Info>
                  {lavoraConNoiData.form.messaggioCv[lang].toUpperCase()}
                </Info>

                <FormTitle>
                  {
                    { it: 'Informativa sulla privacy', en: 'Privacy Policy' }[
                      lang
                    ]
                  }
                </FormTitle>
                <FormCheckbox name="privacyAcceptance" dark>
                  <span>
                    {lavoraConNoiData.form.messaggioPrivacy[lang]}{' '}
                    <Link
                      to={
                        { it: '/privacy-policy', en: '/en/privacy-policy' }[
                          lang
                        ]
                      }
                    >
                      Privacy Policy.
                    </Link>
                  </span>
                </FormCheckbox>
                <FormSubmit dark>Invia</FormSubmit>
                {success && (
                  <SubmissionMessage success>
                    {lavoraConNoiData.form.successMessage[lang]}
                  </SubmissionMessage>
                )}
                {error && (
                  <SubmissionMessage error>
                    {lavoraConNoiData.form.errorMessage[lang]}
                  </SubmissionMessage>
                )}
              </Form>
            </Formik>
          </SectionContent>
        </SectionWrapper>
      </Container>
    </Layout>
  )
}

export const data = graphql`
  query LavoraConNoi($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      lavoraConNoiData {
        tetolo {
          it
          en
        }
        form {
          tetolo {
            it
            en
          }
          messaggioPrivacy {
            it
            en
          }
          messaggioCv {
            it
            en
          }
          successMessage {
            it
            en
          }
          errorMessage {
            it
            en
          }
        }
        posizioniAperte {
          posizioni {
            nomePosizione {
              it
              en
            }
            sede {
              it
              en
            }
            dettagli {
              it
              en
            }
            contratto {
              it
              en
            }
          }
          titolo {
            it
            en
          }
        }
      }
    }
  }
`
