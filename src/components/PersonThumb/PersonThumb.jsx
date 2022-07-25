import React, { useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'
import useResponsiveness from '../../hooks/useResponsiveness'

const Container = styled.button`
  position: relative;
  display: inline-block;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
`

const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 2;

  &:before {
    content: '';
    padding-bottom: 30%;
    display: block;
  }

  flex-wrap: wrap;
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  background-color: ${({ theme, isSelectedPerson }) => theme.transparentRed};

  @media (min-width: 1200px) {
    width: 50%;
  }
`

const InfoContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 1rem;
`

const Circle = styled.div`
  position: absolute;
  right: -50px;
  width: 100px;
  bottom: 15%;
  height: 100px;
  background-color: ${({ theme }) => theme.transparentYellow};
  border-radius: 50%;
  @media (min-width: 769px) {
    z-index: 6;
  }
`

const Info = styled.div`
  margin: 2rem;
  text-align: left;
`

const Name = styled.h5`
  color: ${({ theme }) => theme.white};
  margin-bottom: 0.2rem;
`

const Role = styled.h6`
  color: ${({ theme }) => theme.white};
  margin-right: 1rem;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 1.3;
  }
`

const Foto = styled(GatsbyImage)`
  display: block;
  width: 100%;
  cursor: pointer;

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

  @media (min-width: 769px) {
    ${({ isSelected }) =>
      isSelected &&
      css`
        z-index: 2;
      `}
  }
  ${({ isHovered }) =>
    isHovered &&
    css`
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
    `}
  @media (min-width: 1200px) {
    width: 50%;
  }
`
const FotoContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
  text-align: left;
  font-weight: normal;
  div {
    width: 100%;
  }
  p {
    margin: 0;
    color: black !important;
  }
`

export default function PersonThumb({
  nomeECognome,
  foto,
  ruolo,
  onClick,
  isSelected,
  isOtherSelected,
  selectedDepartment,
}) {
  const [isHovered, setIsHovered] = useState(false)

  const { isMobile } = useResponsiveness()
  const { lang } = useLang()

  const mood = useMemo(() => {
    if (!isMobile) {
      return isHovered || isSelected ? 'scherzosa' : 'seria'
    }
    return isSelected ? 'scherzosa' : 'seria'
  }, [isHovered, isMobile, isSelected])

  const image = getImage(foto && foto[mood]?.localFile?.childImageSharp)

  return (
    <>
      <Container
        onClick={onClick}
        onMouseEnter={() => !isSelected && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        selectedDepartment={selectedDepartment}
        isSelected={isSelected}
      >
        {!isSelected && (
          <FotoContainer>
            <div>
              <p>{nomeECognome}</p>
              {/* <p>{nomeECognome.split(' ')[1]}</p> */}
            </div>
            {/* <div>
              <p>{nomeECognome.split(' ')[1]}</p>
            </div> */}
          </FotoContainer>
        )}
      </Container>
      {isSelected && (
        <>
          <InfoWrapper>
            <Foto
              alt={nomeECognome}
              image={image}
              aspectRatio={1}
              isHovered={isHovered}
              isSelected={isSelected}
              isOtherSelected={isOtherSelected}
              onMouseEnter={() => !isSelected && setIsHovered(true)}
              onMouseLeave={() => !isSelected && setIsHovered(false)}
              onClick={onClick}
            />
            <InfoContainer>
              <InfoContent>
                <Info>
                  <Name>{nomeECognome}</Name>
                  <Role>{ruolo[lang]}</Role>
                </Info>
                <Circle />
              </InfoContent>
            </InfoContainer>
          </InfoWrapper>
        </>
      )}
    </>
  )
}
