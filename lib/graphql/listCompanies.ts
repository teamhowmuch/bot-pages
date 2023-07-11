import { gql } from "@apollo/client";
import { Company } from "../models/Company";
import { client } from "./client";

const companiesQuery = gql`
  query CompaniesQuery {
    companies(first: 100) {
      id
      displayNameCompany

      recommend

      bankURL
      travelURL
      healthURL

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
      fairPayClaims
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

      bankRatingConsumentenbond
      onlineBankingRatingConsumentenbond
      serviceRatingBankingConsumentenbond

      hasApplePay
      hasGooglePay
    }
  }
`;

const banksQuery = gql`
  query CompaniesQuery {
    companies(where: { sellsBankaccount: true }, first: 10) {
      id
      displayNameCompany
      logo {
        id
        url
      }
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

const insuranceQuery = gql`
  query CompaniesQuery {
    companies(where: { sellsHealthInsurance: true }, first: 10) {
      id
      displayNameCompany
      logo {
        id
        url
      }
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

export async function listInsurance() {
  const {
    data: { companies },
  } = await client.query<{ companies: Company[] }>({
    query: insuranceQuery,
  });

  return companies;
}

export async function listBanks() {
  const {
    data: { companies },
  } = await client.query<{ companies: Company[] }>({
    query: banksQuery,
  });

  return companies;
}

export async function listCompanies() {
  const {
    data: { companies },
  } = await client.query<{ companies: Company[] }>({
    query: companiesQuery,
  });

  return companies;
}
