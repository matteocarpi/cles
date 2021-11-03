import React from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import useLang from '../../hooks/useLang'

import FormInput from '../FormInput'

const Container = styled.section``

export default function ContactForm() {
  const { lang } = useLang()

  const mandatory = {
    it: 'Obbligatorio',
    en: 'Mandatory',
  }

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(mandatory[lang]),
    email: Yup.string().email().required(mandatory[lang]),
    message: Yup.string().required(mandatory[lang]),
  })

  const initialValues = {
    fullName: '',
    email: '',
    message: '',
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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Container>
  )
}
