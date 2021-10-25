import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { paroleChiave } from '../../const'
import useLang from '../../hooks/useLang'
import useLocation from '../../hooks/useLocation'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`

const NavItem = styled(Link)`
  color: ${({ active, theme }) => (active ? theme.red : theme.gray)};
  font-weight: 600;

  margin: 10px 0;

  &:visited {
    color: ${({ active, theme }) => (active ? theme.red : theme.gray)};
  }
`

export default function KeyWordNavigation() {
  const { lang } = useLang()
  const { location } = useLocation()

  const baseUrl = {
    it: '/progetti-in-corso',
    en: '/ongoing-projects',
  }

  const keyWordIds = Array.from(Object.keys(paroleChiave))

  return (
    <Container>
      {keyWordIds.map(keyword => {
        const isActive = location.pathname.includes(
          paroleChiave[keyword][lang].toLowerCase().replaceAll(' ', '-'),
        )

        return (
          <NavItem
            active={isActive}
            key={keyword}
            to={
              isActive
                ? baseUrl[lang]
                : `${baseUrl[lang]}/${paroleChiave[keyword][lang]
                    .toLowerCase()
                    .replaceAll(' ', '-')}`
            }
          >
            #{paroleChiave[keyword][lang]}
          </NavItem>
        )
      })}
    </Container>
  )
}
