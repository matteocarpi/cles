import React, { createContext } from 'react'

export const LangContext = createContext()

export default function LangContextProvider({ children, lang }) {
  return (
    <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
  )
}
