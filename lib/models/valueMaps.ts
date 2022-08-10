import { UserValue } from "./ChatData";
import { CompanyClaim, CompanyScore } from "./Company";

export type ValueMap = Record<UserValue, CompanyScore>;

export const valueMap: ValueMap = {
  ceo_pay: "fairPayScore",
  biodiversity: "natureScore",
  climate: "climateScore",
  fair_pay: "fairPayScore",
  animal_welfare: "animalScore",
  tax_evasion_sucks: "antiTaxAvoidanceScore",
  weapons_are_ok: "antiWeaponsScore",
  gender_equality: "equalityScore",
};

export type ClaimMap = Record<UserValue, CompanyClaim>;
export const claimsMap: ClaimMap = {
  ceo_pay: "fairPayClaims",
  biodiversity: "natureClaims",
  climate: "climateClaims",
  fair_pay: "fairPayClaims",
  animal_welfare: "animalClaims",
  tax_evasion_sucks: "antiTaxAvoidanceClaims",
  weapons_are_ok: "antiWeaponsClaims",
  gender_equality: "equalityClaims",
};
