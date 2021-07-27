import React, { createContext } from 'react'

export const LocationContext = createContext()

export default function LangContextProvider({ children, location }) {
  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  )
}
