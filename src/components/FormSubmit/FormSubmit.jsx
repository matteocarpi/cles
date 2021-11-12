import React from 'react'
import { useFormikContext } from 'formik'
import Loading from '../Loading'
import LightButton from '../LightButton'

export default function FormSubmit({ children }) {
  const { isSubmitting } = useFormikContext()

  return isSubmitting ? (
    <Loading light />
  ) : (
    <LightButton type="submit">{children}</LightButton>
  )
}
