export const USER_VALUES = [
  "ceo_pay",
  "biodiversity",
  "climate",
  "fair_pay",
  "animal_welfare",
  "tax_evasion_sucks",
  "weapons_are_ok",
  "gender_equality",
] as const;

export type UserValue = typeof USER_VALUES[number];

export const COMPANY_TYPES = [
  "travel_insurance",
  "health_insurance",
  "banks",
] as const;

export type CompanyType = typeof COMPANY_TYPES[number];

export interface ChatData {
  chat_version: string;
  id: string;

  companies: Record<CompanyType, string>;
  values: Record<UserValue, number>;
  most_important: UserValue;
}
