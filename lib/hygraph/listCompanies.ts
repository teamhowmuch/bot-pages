import { gql } from "graphql-request";
import { hygraphClient } from "./client";

export type Company = {
  id: string;
  displayNameCompany: string;
  nameCompanyInternal: string;

  logo: {
    id: string;
    url: string;
  };

  sellsTravelInsurance: boolean;
  costTravelInsurance: number;

  sellsHealthInsurance: boolean;
  costHealthInsurance: number;

  sellsBankaccount: boolean;
  costBankaccount: number;

  climateClaims: string;
  natureClaims: string;
  fairPayClaims: string;
  antiTaxAvoidanceClaims: string;
  equalityClaims: string;
  antiWeapons: string;
  animalClaims: string;

  natureScore: number;
  climateScore: number;
  fairPayScore: number;
  animalScore: number;
  antiTaxAvoidanceScore: number;
  antiWeaponsScore: number;
  equalityScore: number;
};

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
