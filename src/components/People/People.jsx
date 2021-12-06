import React, { useState } from 'react'
import styled from 'styled-components'
import useLang from '../../hooks/useLang'

import PeopleGrid from '../PeopleGrid'
import MenuText from '../MenuText'

const Container = styled.section`
  position: relative;
  box-sizing: border-box;
  padding: 20px 24px 60px 24px;
  @media (min-width: 769px) {
    padding: 0 40px 80px 20px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const DepartmentList = styled.ul`
  margin-bottom: 40px;

  @media (min-width: 769px) {
    position: sticky;
    top: 21vw;
    left: 40px;
    border-bottom: none;
    margin-bottom: 0;
  }
`

const DepartmentButton = styled.button`
  color: ${({ theme, active }) => (active ? theme.red : theme.gray)};
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 15px;
`

const Department = styled.li`
  &:last-child {
    ${DepartmentButton} {
      margin-bottom: 0;
    }
  }
`

const ComitatoContainer = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: calc(100% - 100px - 26vw);
  }
`

const ComitatoTitle = styled(MenuText)`
  border-bottom: solid 3px ${({ theme }) => theme.yellow};
  width: min-content;
  white-space: nowrap;
  margin-bottom: 0;
`

const ComitatoSubtitle = styled.h6`
  margin-top: 20px;
`

const ComitatoDescrizione = styled.article`
  margin-top: 40px;
`

export default function People({ departments, people, comitato }) {
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
          <Department key={department.id}>
            <DepartmentButton
              onClick={() => toggleDepartment(department)}
              active={selectedDepartment === department.id}
            >
              {department.title[lang]}
            </DepartmentButton>
          </Department>
        ))}
      </DepartmentList>

      {selectedDepartment === 'comitato' ? (
        <ComitatoContainer>
          <ComitatoTitle>{comitato.titolo[lang]}</ComitatoTitle>
          <ComitatoSubtitle
            dangerouslySetInnerHTML={{ __html: comitato.sottotitolo[lang] }}
          />
          <ComitatoDescrizione
            dangerouslySetInnerHTML={{ __html: comitato.descrizione[lang] }}
          />
        </ComitatoContainer>
      ) : (
        <PeopleGrid
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          people={people}
          selectedDepartment={selectedDepartment}
        />
      )}
    </Container>
  )
}
