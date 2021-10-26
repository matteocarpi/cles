import React from 'react'
import styled from 'styled-components'

import ArrowRight from '../../assets/arrow-right.svg'
import ArrowLeft from '../../assets/arrow-left.svg'

const Container = styled.div`
  display: flex;
  align-items: cener;
`

const PageButton = styled.button`
  color: ${({ theme }) => theme.yellow};

  margin: 0 10px;

  &:last-child {
    margin-right: 0;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const Page = styled.h5`
  color: ${({ theme }) => theme.yellow};

  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid  ${theme.yellow}` : 'none'};
`

export default function PageNavigation({ pages, setCurrentPage, currentPage }) {
  return (
    pages.length > 1 && (
      <Container>
        {currentPage !== 0 && (
          <PageButton
            key="arrow-left"
            onClick={() => setCurrentPage(currPage => currPage - 1)}
          >
            <ArrowLeft />
          </PageButton>
        )}
        {pages.map(page => (
          <PageButton
            key={page}
            onClick={() => setCurrentPage(page)}
            type="button"
          >
            <Page selected={currentPage === page}>{page + 1}</Page>
          </PageButton>
        ))}
        {currentPage !== pages.length - 1 && (
          <PageButton
            key="arrow-right"
            onClick={() => setCurrentPage(currPage => currPage + 1)}
          >
            <ArrowRight />
          </PageButton>
        )}
      </Container>
    )
  )
}
