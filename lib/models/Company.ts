export type Company = {
  id: string;
  displayNameCompany: string;
  nameCompanyInternal: string;

  recommend: boolean;

  logo: {
    id: string;
    url: string;
  };

  bankURL: string;
  travelURL: string;
  healthURL: string;

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

  bankRatingConsumentenbond?: number;
  onlineBankingRatingConsumentenbond?: number;
  serviceRatingBankingConsumentenbond?: number;

  hasApplePay?: boolean;
  hasGooglePay?: boolean;
};

export type ScoreOutOfFive = 1 | 2 | 3 | 4 | 5;

export interface RankedCompany extends Company {
  score: number;
  rank: number;
  relativeScore: number;
  scoreOutOfFive: 1 | 2 | 3 | 4 | 5;
}

export type CompanyType = "healthInsurance" | "travelInsurance" | "banks";
export type UserCompanies = Record<
  CompanyType,
  { current: RankedCompany[]; alternatives: RankedCompany[] }
>;

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
