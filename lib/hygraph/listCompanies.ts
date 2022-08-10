import { gql } from "graphql-request";
import { Company } from "../models/Company";
import { hygraphClient } from "./client";

export async function listCompanies() {
  const query = gql`
    query CompaniesQuery {
      companies {
        id
        displayNameCompany

        sellsTravelInsurance
        costTravelInsurance

        costHealthInsurance
        sellsHealthInsurance

        costBankaccount
        sellsBankaccount

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
    query
  );

  return companies;
}
