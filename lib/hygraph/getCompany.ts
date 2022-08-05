import { gql } from "graphql-request";
import { hygraphClient } from "./client";
import { Company } from "./listCompanies";

export async function getCompanyById(id: string) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(where: { id: $id }) {
        id
        displayNameCompany
        nameCompanyInternal
        climateClaims
        climateScore
      }
    }
  `;

  const { company } = await hygraphClient.request<{ company: Company }>(query, {
    id,
  });

  return company;
}
