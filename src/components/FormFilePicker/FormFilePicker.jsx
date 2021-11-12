import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

const Container = styled.label``

const HiddenInput = styled.input`
  display: none;
`

const FileName = styled.p`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.gray};
`

const FakeButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200px;
  height: 56px;
  margin-bottom: 15px;
  margin-top: 35px;
  border: 3px solid ${({ theme }) => theme.yellow};
  padding: 1.5rem;
  color: ${({ theme }) => theme.black};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  opacity: 60%;

  &:hover {
    opacity: 100%;
  }

  &:active {
    background-color: ${({ theme }) => theme.yellow};
  }
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.red};
`

export default function FormFilePicker({ name }) {
  const [field, meta, helpers] = useField(name)

  const handleFileChoice = async e => {
    const file = e.target.files[0]

    helpers.setValue(file)
  }

  return (
    <Container htmlFor={name}>
      <HiddenInput
        id={name}
        type="file"
        multiple={false}
        onChange={handleFileChoice}
        accept=".doc, .pdf, .docx, .gdoc"
      />
      <FakeButton to="#">Carica cv</FakeButton>
      {field.value && <FileName>{field.value.name}</FileName>}
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Container>
  )
}
