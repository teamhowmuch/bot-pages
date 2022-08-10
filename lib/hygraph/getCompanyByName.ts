import { gql } from "graphql-request";
import { hygraphClient } from "./client";
import { Company } from "./listCompanies";

export async function getCompanyByName(name: string) {
  const query = gql`
    query CompanyQuery($name: String!) {
      company(where: { nameCompanyInternal: $name }) {
        id
        displayNameCompany
        nameCompanyInternal
        climateClaims
        climateScore
      }
    }
  `;

  const { company } = await hygraphClient.request<{ company: Company }>(query, {
    name,
  });

  return company;
}

export async function getTravelInsurance(name: string) {
  const query = gql`
    query CompanyQuery($name: String!) {
      companies(
        where: { displayNameCompany: $name, sellsTravelInsurance: true }
      ) {
        id
        displayNameCompany
        nameCompanyInternal
        logo {
          id
          url
        }
        climateClaims
        natureClaims
        fairpayClaims
        antiTaxAvoidanceClaims
        equalityClaims
        antiWeaponsClaims
        animalClaims

        natureScore
        climateScore
        fairPayScore
        animalScore
        antiTaxAvoidanceScore
        antiWeaponsScore
        equalityScore
      }
    }
  `;

  const { companies } = await hygraphClient.request<{ companies: Company[] }>(
    query,
    {
      name,
    }
  );

  return companies[0];
}
