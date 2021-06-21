import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo-icon.svg'
import Burger from '../../assets/burger.svg'
import MenuText from '../MenuText'
import MobileMenu from '../MobileMenu'

const Container = styled.header`
  position: absolute;
  top: 0;
  width: calc(100% - 2rem);
  z-index: 1;
  margin: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`

const MenuButton = styled.button``

const PageTitle = styled(MenuText)`
  margin: 0;
  margin-right: 0.5rem;
`

export default function Header({ lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <Container>
        <Logo />

        <Navigation>
          <PageTitle>Home</PageTitle>

          <MenuButton onClick={() => setIsMenuOpen(true)}>
            <Burger />
          </MenuButton>
        </Navigation>
      </Container>
      {isMenuOpen && <MobileMenu lang={lang} setIsMenuOpen={setIsMenuOpen} />}
    </>
  )
}
