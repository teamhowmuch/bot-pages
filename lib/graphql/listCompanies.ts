import { gql } from "@apollo/client";
import { Company } from "../models/Company";
import { client } from "./client";

const companiesQuery = gql`
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

export async function listCompanies() {
  const {
    data: { companies },
  } = await client.query<{ companies: Company[] }>({
    query: companiesQuery,
  });

  return companies;
}
