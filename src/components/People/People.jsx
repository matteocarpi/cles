import React, { useState } from 'react'
import styled from 'styled-components'
import useLang from '../../hooks/useLang'

import PeopleGrid from '../PeopleGrid'

const Container = styled.section`
  position: relative;
  box-sizing: border-box;
  padding: 0 24px 56px 24px;
  @media (min-width: 769px) {
    padding: 0 40px 80px 40px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const DepartmentList = styled.ul`
  border-bottom: solid 2px ${({ theme }) => theme.gray};
  margin-bottom: 56px;

  @media (min-width: 769px) {
    position: sticky;
    top: 21vw;
    left: 40px;
    border-bottom: none;
    margin-bottom: 0;
  }
`

const Department = styled.li``

const DepartmentButton = styled.button`
  color: ${({ theme, active }) => (active ? theme.red : theme.gray)};
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 15px;
`

export default function People({ departments, people }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null)

  const { lang } = useLang()

  const toggleDepartment = department => {
    setSelectedPerson(null)
    setSelectedDepartment(
      department.id === selectedDepartment ? null : department.id,
    )
  }

  return (
    <Container>
      <DepartmentList>
        {departments.map(department => (
          <Department>
            <DepartmentButton
              onClick={() => toggleDepartment(department)}
              active={selectedDepartment === department.id}
            >
              {department.title[lang]}
            </DepartmentButton>
          </Department>
        ))}
      </DepartmentList>

      <PeopleGrid
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        people={people}
        selectedDepartment={selectedDepartment}
      />
    </Container>
  )
}
