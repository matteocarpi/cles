import React, { useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'
import useResponsiveness from '../../hooks/useResponsiveness'

const Container = styled.button`
  position: relative;

  &:first-child {
    grid-column: 1/3;
    grid-row: 1/3;
  }
`

const InfoWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.transparentRed};

  @media (min-width: 768px) {
    z-index: 2;
    background-color: transparent;
  }
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-left: 100%;
    width: 100%;
  }
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.transparentYellow};
  border-radius: 50%;
  transform: translateX(50%);
  @media (min-width: 768px) {
    z-index: 6;
  }
`

const Info = styled.div`
  margin: 2rem;
  text-align: left;
`

const Name = styled.h5`
  color: ${({ theme }) => theme.white};
`

const Role = styled.h6`
  color: ${({ theme }) => theme.white};
`

const Foto = styled(GatsbyImage)`
  display: block;

  @media (min-width: 768px) {
    ${({ isSelected }) =>
      isSelected &&
      css`
        z-index: 2;
      `}

    ${({ isOtherSelected }) =>
      isOtherSelected &&
      css`
        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: ${({ theme }) => theme.transparentRed};
          z-index: 1;
        }
      `}
     
    &:hover {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: ${({ theme }) => theme.transparentYellow};
        z-index: 1;
      }
    }
  }
`

export default function PersonThumb({
  nomeECognome,
  foto,
  ruolo,
  onClick,
  isSelected,
  isOtherSelected,
}) {
  const [isHovered, setIsHovered] = useState(false)

  const { isMobile } = useResponsiveness()
  const { lang } = useLang()

  const mood = useMemo(() => {
    if (!isMobile) {
      return isHovered ? 'scherzosa' : 'seria'
    }
    return isSelected ? 'scherzosa' : 'seria'
  }, [isHovered, isMobile, isSelected])

  const image = getImage(foto[mood].localFile.childImageSharp)

  return (
    <Container
      onClick={onClick}
      onMouseEnter={() => !isSelected && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Foto
        isSelected={isSelected}
        alt={nomeECognome}
        image={image}
        aspectRatio={1}
        isOtherSelected={isOtherSelected}
        onMouseEnter={() => !isSelected && setIsHovered(true)}
        onMouseLeave={() => !isSelected && setIsHovered(false)}
      />
      {isSelected && (
        <InfoWrapper>
          <InfoContainer>
            <Info>
              <Name>{nomeECognome}</Name>
              <Role>{ruolo[lang]}</Role>
            </Info>
            <Circle />
          </InfoContainer>
        </InfoWrapper>
      )}
    </Container>
  )
}
