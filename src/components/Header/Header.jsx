import React, { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import HeadRoom from 'react-headroom'

import useViewportScroll from '../../hooks/useViewportScroll'
import useLang from '../../hooks/useLang'
import useNavigation from '../../hooks/useNavigation'

import Logo from '../LogoIcon'
import Burger from '../../assets/burger.svg'
import MobileMenu from '../MobileMenu'
import MenuText from '../MenuText'

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
  z-index: 3;

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
  align-items: flex-start;
`

const NavigationDesktop = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
  height: 9vw;

  ${({ hasScrolled }) =>
    hasScrolled &&
    css`
      background-color: ${({ theme }) => theme.white};
    `}
`

const LogoMobileLink = styled(Link)``

const LogoMobile = styled(Logo)`
  width: 100px;
`

const LogoDesktop = styled(Logo)`
  position: fixed;
  top: 40px;
  left: 40px;
  height: 15.5vw;
  z-index: 2;

  ${({ yellowVariant }) =>
    yellowVariant &&
    css`
      position: absolute;
      left: 120px;
    `}
`

const NavItem = styled(Link)`
  margin: 0 20px;

  &:last-child {
    margin-right: 0;
  }

  white-space: nowrap;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;

  text-decoration: ${({ isLangSwitch }) =>
    isLangSwitch ? 'underline' : 'none'};
  padding-bottom: 5px;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      border-bottom: solid 3px ${theme.yellow};
    `}
`

const MenuButton = styled.button``

const PageTitle = styled(MenuText)`
  margin: 0;
  margin-right: 0.5rem;
`

export default function Header({ parentUrl, yellowVariant }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const { navigation } = useNavigation()

  const { lang } = useLang()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const scrollY = useViewportScroll()

  const hasScrolled = useMemo(() => scrollY > 400, [scrollY])

  const pageTitle = navigation.pages.find(p => p.url[lang].includes(parentUrl))

  return (
    <>
      <ContainerMobile>
        <LogoMobileLink to={lang === 'it' ? '/' : '/en'}>
          <LogoMobile />
        </LogoMobileLink>

        <NavigationMobile>
          <PageTitle>{pageTitle?.label[lang] ?? 'Home'}</PageTitle>

          <MenuButton onClick={() => setIsMenuOpen(true)}>
            <Burger />
          </MenuButton>
        </NavigationMobile>
      </ContainerMobile>
      {isMenuOpen && <MobileMenu lang={lang} setIsMenuOpen={setIsMenuOpen} />}

      <WrapperDesktop>
        <ContainerDesktop>
          <Link to={lang === 'it' ? '/' : `/${lang}`}>
            <LogoDesktop yellowVariant={yellowVariant} />
          </Link>
        </ContainerDesktop>

        <HeadRoom pinStart={400}>
          <NavigationWrapper>
            <NavigationDesktop hasScrolled={hasScrolled}>
              {navigation.pages.map(page => (
                <NavItem
                  to={page.url[lang]}
                  key={page.label[lang]}
                  isActive={page.url[lang].includes(parentUrl)}
                >
                  {page.label[lang]}
                </NavItem>
              ))}

              <NavItem to={lang === 'it' ? '/en' : '/'} isLangSwitch>
                {lang === 'it' ? 'EN' : 'IT'}
              </NavItem>
            </NavigationDesktop>
          </NavigationWrapper>
        </HeadRoom>
      </WrapperDesktop>
    </>
  )
}
