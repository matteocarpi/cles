/* eslint-disable import/prefer-default-export */
import React from 'react'
import { ApolloProvider } from '@apollo/client'
// eslint-disable-next-line import/no-named-as-default
import client from './client'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
