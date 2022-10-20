import { BaseEntity } from "./BaseEntity";

export type User = BaseEntity & {
  id: number;
  email: string;
  name?: string;
  active: boolean;
};
