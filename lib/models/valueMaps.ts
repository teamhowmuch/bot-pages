import { CompanyClaim, CompanyScore } from "./Company";
import { User } from "./User";

export type UserValueScores = Pick<
  User,
  | "anti_tax_avoidance_score"
  | "animal_score"
  | "anti_weapons_score"
  | "climate_score"
  | "equality_score"
  | "fair_pay_score"
  | "nature_score"
>;
export type UserValueScore = keyof UserValueScores;

export type ValueMap = Record<UserValueScore, CompanyScore>;
export const valueMap: ValueMap = {
  fair_pay_score: "fairPayScore",
  nature_score: "natureScore",
  climate_score: "climateScore",
  animal_score: "animalScore",
  anti_tax_avoidance_score: "antiTaxAvoidanceScore",
  anti_weapons_score: "antiWeaponsScore",
  equality_score: "equalityScore",
};

export type ClaimMap = Record<UserValueScore, CompanyClaim>;
export const claimsMap: ClaimMap = {
  fair_pay_score: "fairPayClaims",
  nature_score: "natureClaims",
  climate_score: "climateClaims",
  animal_score: "animalClaims",
  anti_tax_avoidance_score: "antiTaxAvoidanceClaims",
  anti_weapons_score: "antiWeaponsClaims",
  equality_score: "equalityClaims",
};
