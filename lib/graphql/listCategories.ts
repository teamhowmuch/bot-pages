import { gql } from "@apollo/client";
import { CompanyCategory, CompanyCategoryWithCompanies } from "../models";
import { client } from "./client";

const categoriesQuery = gql`
  query ListCategories {
    companyCategories {
      id
      name
      slug
    }
  }
`;

const featuredCategoriesQuery = gql`
  query FeaturedCategoriesWithCompanies {
    companyCategories(where: { featureExplore: true }) {
      id
      name
      slug
      companies(first: 10) {
        id
        displayNameCompany
        logo {
          url
          id
        }
      }
    }
  }
`;

export async function listCategories() {
  const {
    data: { companyCategories },
  } = await client.query<{ companyCategories: CompanyCategory[] }>({
    query: categoriesQuery,
  });

  return companyCategories;
}

export async function listFeaturedCategories() {
  const {
    data: { companyCategories },
  } = await client.query<{ companyCategories: CompanyCategoryWithCompanies[] }>(
    {
      query: featuredCategoriesQuery,
    }
  );

  return companyCategories;
}
