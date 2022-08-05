import { gql, GraphQLClient } from "graphql-request";

export const hygraphClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT as string, {
  headers: { Authorization: `Bearer ${process.env.HYGRAPH_TOKEN as string}` },
});
