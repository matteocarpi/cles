import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@apollo/client'
import useLang from '../../hooks/useLang'
import { SEND_EMAIL } from '../../graphql/mutations'

import FormInput from '../FormInput'
import FormTextArea from '../FormTextArea/FormTextArea'
import FormCheckbox from '../FormCheckbox'
import FormSubmit from '../FormSubmit'
import FormMessage from '../FormMessage'
import Link from '../Link'

const Container = styled.section`
  padding-bottom: 60px;
`

const PrivacyTitle = styled.p`
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 700;
`

export default function ContactForm({ privacy }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const { lang } = useLang()

  const [sendEmail] = useMutation(SEND_EMAIL)

  const messages = {
    sent: {
      it: 'Messaggio inviato con successo',
      en: 'Message succesfully sent',
    },
    error: {
      it: 'Si è verificato un errore, riprova più tardi',
      en: 'Something went wrong, try again later',
    },
  }
  const mandatory = {
    it: 'Obbligatorio',
    en: 'Mandatory',
  }

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(mandatory[lang]),
    email: Yup.string().email().required(mandatory[lang]),
    message: Yup.string().required(mandatory[lang]),
    privacyAcceptance: Yup.boolean().required(),
  })

  const initialValues = {
    fullName: '',
    email: '',
    message: '',
    privacyAcceptance: false,
  }

  const labels = {
    fullName: {
      it: 'Nome e Cognome',
      en: 'Full Name',
    },
    email: {
      it: 'Email',
      en: 'Email',
    },
    message: {
      it: 'Messaggio',
      en: 'Message',
    },
  }

  async function handleSubmit(values, { resetForm }) {
    const { fullName, email, message } = values
    try {
      await sendEmail({
        variables: { email, body: message, from: `${fullName}<${email}>` },
      })
      resetForm()
    } catch {
      // eslint-disable-next-line no-console
      setError(true)
    }

    return setSent(true)
  }

  return (
    <Container>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnBlur
      >
        <Form>
          <FormInput placeholder={labels.fullName[lang]} name="fullName" />
          <FormInput placeholder={labels.email[lang]} name="email" />
          <FormTextArea placeholder={labels.message[lang]} name="message" />
          <PrivacyTitle>Privacy Policy</PrivacyTitle>
          <FormCheckbox name="privacyAcceptance">
            <span>
              {privacy} <Link to="/">Privacy Policy.</Link>
            </span>
          </FormCheckbox>
          {!sent && !error && (
            <FormSubmit>{lang === 'it' ? 'Invia' : 'Submit'}</FormSubmit>
          )}
          {sent && <FormMessage>{messages.sent[lang]}</FormMessage>}
          {error && <FormMessage isError>{messages.error[lang]}</FormMessage>}
        </Form>
      </Formik>
    </Container>
  )
}
