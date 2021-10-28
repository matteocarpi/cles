import { useState, useMemo } from 'react'

export default function usePagination({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(0)

  const pages = useMemo(() => {
    const numPages = Math.ceil(items.length / itemsPerPage)
    return Array.from(Array(numPages).keys())
  }, [items.length, itemsPerPage])

  const paginatedItems = useMemo(() => {
    const itemsPages = pages.map((page, index) => {
      const start = page * index
      const end = start + itemsPerPage

      return items.slice(start, end)
    })
    return itemsPages
  }, [pages, itemsPerPage, items])

  return {
    pages,
    paginatedItems,
    currentItems: paginatedItems[currentPage],
    setCurrentPage,
    currentPage,
  }
}
