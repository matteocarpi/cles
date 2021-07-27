import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'

import PersonThumb from '../PersonThumb'

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 71%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export default function PeopleGrid({ people, selectedDepartment }) {
  const [selectedPeople, setSelectedPeople] = useState(people)

  const [selectedPerson, setSelectedPerson] = useState(null)

  const ref = useRef()

  useEffect(() => {
    if (selectedDepartment) {
      setSelectedPeople(
        people.filter(person => person.dipartimento === selectedDepartment),
      )
    } else setSelectedPeople(people)
  }, [people, selectedDepartment])

  const handlePersonClick = useCallback(
    (person, index) => {
      if (selectedPerson === person.nomeECognome) {
        setSelectedPerson(null)
      } else {
        setSelectedPerson(person.nomeECognome)

        const reorderedPeople = [
          person,
          ...selectedPeople.slice(0, index),
          ...selectedPeople.slice(index + 1),
        ]

        setSelectedPeople(reorderedPeople)
      }

      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: ref.current.offsetTop - 200,
          behavior: `smooth`,
        })
      }
    },
    [selectedPeople, selectedPerson],
  )

  return (
    <Container ref={ref}>
      {selectedPeople.map((person, index) => (
        <PersonThumb
          {...person}
          setSelectedPeople={setSelectedPeople}
          onClick={() => handlePersonClick(person, index)}
          isSelected={selectedPerson === person.nomeECognome}
        />
      ))}
    </Container>
  )
}
