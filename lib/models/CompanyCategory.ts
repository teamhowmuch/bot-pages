import { Company, CompanyBase } from "./Company";

export type CompanyCategory = {
  id: string;
  name: string;
  slug: string;
};

export type CompanyCategoryWithCompanies = {
  id: string;
  name: string;
  slug: string;

  companies: CompanyBase[];
};
