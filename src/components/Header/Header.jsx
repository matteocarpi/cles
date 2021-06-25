import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Logo from '../LogoIcon'
import Burger from '../../assets/burger.svg'
import MenuText from '../MenuText'
import MobileMenu from '../MobileMenu'
import navigation from '../../data/navigation.json'

const ContainerMobile = styled.header`
  position: absolute;
  top: 0;
  width: calc(100% - 2rem);
  z-index: 1;
  margin: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
    display: none;
  }
`

const WrapperDesktop = styled.header`
  @media (max-width: 767px) {
    display: none;
  }

  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  top: 0;
  z-index: 1;
`

const ContainerDesktop = styled.div`
  position: relative;
  padding: 40px;
  display: flex;
  width: 100%;
`

const NavigationMobile = styled.nav`
  display: flex;
  align-items: center;
`

const NavigationDesktop = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-left: 350px;
  width: calc(100% - 350px);
`

const LogoMobile = styled(Logo)`
  width: 100px;
`

const LogoDesktop = styled(Logo)`
  position: fixed;
  top: 40px;
  left: 40px;
  width: 300px;
`

const NavItem = styled(Link)`
  margin: 0 40px;

  &:last-child {
    margin-right: 0;
  }

  white-space: nowrap;
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
      <ContainerMobile>
        <LogoMobile />

        <NavigationMobile>
          <PageTitle>Home</PageTitle>

          <MenuButton onClick={() => setIsMenuOpen(true)}>
            <Burger />
          </MenuButton>
        </NavigationMobile>
      </ContainerMobile>
      {isMenuOpen && <MobileMenu lang={lang} setIsMenuOpen={setIsMenuOpen} />}

      <WrapperDesktop>
        <ContainerDesktop>
          <LogoDesktop />
          <NavigationDesktop>
            {navigation.pages.map(page => (
              <NavItem to={page.url[lang]} key={page.url[lang]}>
                <MenuText>{page.label[lang]}</MenuText>
              </NavItem>
            ))}
          </NavigationDesktop>
        </ContainerDesktop>
      </WrapperDesktop>
    </>
  )
}
