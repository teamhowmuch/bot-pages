import { gql } from "@apollo/client";
import { client } from "./client";
import { Company } from "../models";

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

  const {
    data: { company },
  } = await client.query<{ company: Company }>({
    query,
    variables: {
      id,
    },
  });

  return company;
}
