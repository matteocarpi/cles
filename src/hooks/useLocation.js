import { useContext } from 'react'
import { LocationContext } from '../LocationContext'

export default function useLocation() {
  return useContext(LocationContext)
}
