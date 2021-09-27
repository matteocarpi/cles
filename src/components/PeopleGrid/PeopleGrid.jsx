import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import useScrollPosition from '@react-hook/window-scroll'

import PersonThumb from '../PersonThumb'

const Container = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  position: relative;

  @media (min-width: 769px) {
    width: calc(100% - 80px - 26vw);
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  background-color: ${({ theme, isSelectedPerson }) =>
    isSelectedPerson ? theme.transparentRed : 'transparent'};
`

export default function PeopleGrid({
  people,
  selectedDepartment,
  selectedPerson,
  setSelectedPerson,
}) {
  const [selectedPeople, setSelectedPeople] = useState(people)

  const ref = useRef()

  const scrollY = useScrollPosition()

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
          top: ref.current.getBoundingClientRect().top + scrollY - 120,
          behavior: `smooth`,
        })
      }
    },
    [scrollY, selectedPeople, selectedPerson, setSelectedPerson],
  )

  return (
    <Container ref={ref} isSelectedPerson={selectedPerson != null}>
      {selectedPeople.map((person, index) => (
        <PersonThumb
          {...person}
          setSelectedPeople={setSelectedPeople}
          onClick={() => handlePersonClick(person, index)}
          isSelected={selectedPerson === person.nomeECognome}
          isOtherSelected={
            selectedPerson && selectedPerson !== person.nomeECognome
          }
        />
      ))}
    </Container>
  )
}
