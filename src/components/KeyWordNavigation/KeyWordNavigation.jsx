import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { paroleChiave, all } from '../../const'
import useLang from '../../hooks/useLang'
import useLocation from '../../hooks/useLocation'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  margin-top: 40px;
  border-top: solid 1px ${({ theme }) => theme.gray};
  padding-top: 20px;
  margin-bottom: 60px;
`

const NavItem = styled(Link)`
  color: ${({ active, theme }) => (active ? theme.red : theme.gray)};
  font-weight: 600;

  margin: 10px 0;

  &:visited {
    color: ${({ active, theme }) => (active ? theme.red : theme.gray)};
  }
`

export default function KeyWordNavigation({ status }) {
  const { lang } = useLang()
  const { location } = useLocation()

  const baseUrl = {
    aperto: {
      it: '/progetti-in-corso',
      en: '/ongoing-projects',
    },
    chiuso: {
      it: '/progetti-chiusi-dopo-il-2015',
      en: '/closed-projects-after-2015',
    },
  }

  const keyWordIds = Array.from(Object.keys(paroleChiave))

  return (
    <Container>
      <NavItem key="tutti" to={baseUrl[status][lang]}>
        #{all[lang]}
      </NavItem>
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
                ? baseUrl[status][lang]
                : `${baseUrl[status][lang]}/${paroleChiave[keyword][lang]
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
