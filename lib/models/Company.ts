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

  climateClaims?: string;
  natureClaims?: string;
  fairPayClaims?: string;
  antiTaxAvoidanceClaims?: string;
  equalityClaims?: string;
  antiWeaponsClaims?: string;
  animalClaims?: string;

  natureScore: number;
  climateScore: number;
  fairPayScore: number;
  animalScore: number;
  antiTaxAvoidanceScore: number;
  antiWeaponsScore: number;
  equalityScore: number;
};

export type CompanyRelation =
  | "travelInsurance"
  | "healthInsurance"
  | "bank"
  | "superBadAlternative"
  | "travelInsuranceAlternative"
  | "healthInsuranceAlternative"
  | "bankAlternative";

export interface RankedCompany extends Company {
  score: number;
  rank: number;
}

export interface RankedCompanyWithRelations extends RankedCompany {
  userRelations: CompanyRelation[];
  hasAlternative: boolean;
}

export type CompanyScores = Pick<
  Company,
  | "fairPayScore"
  | "natureScore"
  | "climateScore"
  | "fairPayScore"
  | "animalScore"
  | "antiTaxAvoidanceScore"
  | "antiWeaponsScore"
  | "equalityScore"
>;
export type CompanyScore = keyof CompanyScores;

export const COMPANY_CLAIM_FIELDS = [
  "fairPayClaims",
  "natureClaims",
  "climateClaims",
  "fairPayClaims",
  "animalClaims",
  "antiTaxAvoidanceClaims",
  "antiWeaponsClaims",
  "equalityClaims",
] as const;

export type CompanyClaim = typeof COMPANY_CLAIM_FIELDS[number];
