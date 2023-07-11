import { BaseEntity } from "./BaseEntity";

export type User = BaseEntity & {
  id: number;
  email: string;
  name?: string;
  active: boolean;
  equality_score: number;
  fair_pay_score: number;
  climate_score: number;
  anti_weapons_score: number;
  animal_score: number;
  nature_score: number;
  anti_tax_avoidance_score: number;
};
