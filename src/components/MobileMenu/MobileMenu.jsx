import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import navigation from '../../data/navigation.json'
import Close from '../../assets/close.svg'

const Container = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.black};
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Navigation = styled.nav`
  position: absolute;
  bottom: 1rem;
`

const NavItem = styled(Link)``

const NavItemText = styled.h3`
  color: ${({ theme }) => theme.yellow};
`

const Lang = styled.h4`
  color: ${({ theme }) => theme.yellow};
  text-decoration: underline;
`

const CloseButton = styled.button``

export default function MobileMenu({ lang, setIsMenuOpen }) {
  return (
    <Container>
      <Top>
        <Link to={navigation.languages[lang].url}>
          <Lang>{navigation.languages[lang].label}</Lang>
        </Link>
        <CloseButton onClick={() => setIsMenuOpen(false)}>
          <Close />
        </CloseButton>
      </Top>

      <Navigation>
        {navigation.pages.map(item => (
          <NavItem key={item.label[lang]} to={item.url[lang]}>
            <NavItemText>{item.label[lang]}</NavItemText>
          </NavItem>
        ))}
      </Navigation>
    </Container>
  )
}
