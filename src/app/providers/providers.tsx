'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/shared/api/graphql/client';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}