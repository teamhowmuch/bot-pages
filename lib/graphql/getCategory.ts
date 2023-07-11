import { gql } from "@apollo/client";
import { CompanyCategory, CompanyCategoryWithCompanies } from "../models";
import { client } from "./client";

const categoryByIdQuery = gql`
  query FeaturedCategories($id: ID!) {
    companyCategories(where: { id: $id }) {
      id
      name
      slug
    }
  }
`;

const categoryBySlugQuery = gql`
  query FeaturedCategories($slug: String!) {
    companyCategory(where: { slug: $slug }) {
      id
      name
      slug
    }
  }
`;

export async function getCategoryById(id: string) {
  const {
    data: { companyCategory },
  } = await client.query<{ companyCategory: CompanyCategory }>({
    query: categoryByIdQuery,
    variables: { id },
  });

  return companyCategory;
}

export async function getCategoryBySlug(slug: string) {
  const {
    data: { companyCategory },
  } = await client.query<{ companyCategory: CompanyCategory }>({
    query: categoryBySlugQuery,
    variables: { slug },
  });

  return companyCategory;
}
