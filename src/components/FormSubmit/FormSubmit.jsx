import React from 'react'
import { useFormikContext } from 'formik'
import Loading from '../Loading'
import LightButton from '../LightButton'
import DarkButton from '../DarkButton'

export default function FormSubmit({ children, dark }) {
  const { isSubmitting } = useFormikContext()

  if (isSubmitting) return <Loading light />

  return dark ? (
    <DarkButton type="submit">{children}</DarkButton>
  ) : (
    <LightButton type="submit">{children}</LightButton>
  )
}
