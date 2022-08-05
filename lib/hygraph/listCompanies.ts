import { gql } from "graphql-request";
import { hygraphClient } from "./client";

export type Company = {
  id: string;
  displayNameCompany: string;
  nameCompanyInternal: string;
  climateClaims: string;
  climateScore: number;
};

export async function listCompanies() {
  console.log("try get shit");

  const query = gql`
    query CompaniesQuery {
      companies {
        id
        displayNameCompany
        nameCompanyInternal
        climateClaims
        climateScore
      }
    }
  `;

  const { companies } = await hygraphClient.request<{ companies: Company[] }>(
    query
  );

  return companies;
}
