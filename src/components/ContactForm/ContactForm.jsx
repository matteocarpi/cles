import React from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import useLang from '../../hooks/useLang'

import FormInput from '../FormInput'
import FormTextArea from '../FormTextArea/FormTextArea'
import FormCheckbox from '../FormCheckbox'
import FormSubmit from '../FormSubmit'
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
  const { lang } = useLang()

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

  function handleSubmit(values) {
    console.log(values)
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
          <FormSubmit>{lang === 'it' ? 'Invia' : 'Submit'}</FormSubmit>
        </Form>
      </Formik>
    </Container>
  )
}
