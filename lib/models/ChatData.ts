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

export interface ChatData {
  email: string;
  bot_version: string;
  id: string;

  companies: {
    travel_insurance: string;
    health_insurance: string;
    banks: string[];
  };
  values: Record<UserValue, number>;
  most_important: UserValue;
}
