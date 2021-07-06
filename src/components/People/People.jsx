import React, { useState } from 'react'
import styled from 'styled-components'
import useLang from '../../hooks/useLang'

import PeopleGrid from '../PeopleGrid'

const Container = styled.section`
  margin-bottom: 56px;
`

const DepartmentList = styled.ul`
  border-bottom: solid 2px ${({ theme }) => theme.gray};
  margin-bottom: 56px;
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

  const { lang } = useLang()

  const toggleDepartment = department =>
    setSelectedDepartment(
      department.id === selectedDepartment ? null : department.id,
    )

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

      <PeopleGrid people={people} selectedDepartment={selectedDepartment} />
    </Container>
  )
}
