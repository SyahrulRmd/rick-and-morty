'use client'

import React, { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider as AP, gql } from '@apollo/client';

export default function ApolloProvider({ children }: { children: ReactNode }) {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <AP client={client}>{children}</AP>
  )
}
