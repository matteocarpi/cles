/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.WORDPRESS_API_ENDPOINT,
  fetch,
  cache: new InMemoryCache(),
})
