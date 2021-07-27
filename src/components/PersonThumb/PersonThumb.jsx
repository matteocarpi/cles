import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import useLang from '../../hooks/useLang'

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
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.transparentYellow};
  border-radius: 50%;
  transform: translateX(50%);
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
`

export default function PersonThumb({
  nomeECognome,
  foto,
  ruolo,
  onClick,
  isSelected,
}) {
  const { lang } = useLang()

  const mood = isSelected ? 'scherzosa' : 'seria'

  const image = getImage(foto[mood].localFile.childImageSharp)

  return (
    <Container onClick={onClick}>
      <Foto alt={nomeECognome} image={image} aspectRatio={1} />
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
