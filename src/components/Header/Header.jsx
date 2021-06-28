import React, { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import HeadRoom from 'react-headroom'

import useViewportScroll from '../../hooks/useViewportScroll'

import Logo from '../LogoIcon'
import Burger from '../../assets/burger.svg'
import MobileMenu from '../MobileMenu'
import MenuText from '../MenuText'

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

  @media (min-width: 1110px) {
    display: none;
  }
`

const WrapperDesktop = styled.header`
  @media (max-width: 1110px) {
    display: none;
  }

  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  top: 0;
  z-index: 2;

  .headroom {
    width: 100vw;
  }
`

const NavigationWrapper = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    background-color: pink;
    width: 350px;
    height: 50px;
  }
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
  padding: 46px 0;
  padding-right: 40px;

  ${({ hasScrolled }) =>
    hasScrolled &&
    css`
      background-color: ${({ theme }) => theme.white};
    `}
`

const LogoMobile = styled(Logo)`
  width: 100px;
`

const LogoDesktop = styled(Logo)`
  position: fixed;
  top: 40px;
  left: 40px;
  width: 300px;
  z-index: 2;
`

const NavItem = styled(Link)`
  margin: 0 40px;

  &:last-child {
    margin-right: 0;
  }

  white-space: nowrap;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
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

  const scrollY = useViewportScroll()

  const hasScrolled = useMemo(() => scrollY > 400, [scrollY])

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
          <Link to={lang === 'it' ? '/' : `/${lang}`}>
            <LogoDesktop />
          </Link>
        </ContainerDesktop>

        <HeadRoom>
          <NavigationWrapper>
            <NavigationDesktop hasScrolled={hasScrolled}>
              {navigation.pages.map(page => (
                <NavItem to={page.url[lang]} key={page.url[lang]}>
                  {page.label[lang]}
                </NavItem>
              ))}
            </NavigationDesktop>
          </NavigationWrapper>
        </HeadRoom>
      </WrapperDesktop>
    </>
  )
}
