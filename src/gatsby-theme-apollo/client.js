/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.WORDPRESS_API_ENDPOINT,
    fetch,
  }),
  cache: new InMemoryCache(),
})

export default client
