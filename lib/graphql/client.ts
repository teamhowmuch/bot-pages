import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.HYGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  headers: { Authorization: `Bearer ${process.env.HYGRAPH_TOKEN as string}` },
});
