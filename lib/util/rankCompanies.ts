import {
  ChatData,
  Company,
  RankedCompany,
  UserValue,
  valueMap,
} from "../models";

const POINT_MAP = {
  1: -2,
  2: -1,
  3: 0,
  4: 2,
  5: 3,
} as const;

export function rankCompanies(
  companies: Company[],
  data: ChatData
): RankedCompany[] {
  const rankedCompanies = companies.map((c) => ({ ...c, score: 0, rank: 0 }));

  for (const company of rankedCompanies) {
    for (let [valueName, scoreName] of Object.entries(valueMap)) {
      const userScore = data.values
        ? (data.values[valueName as UserValue] as number) || 3
        : 3;
      if (userScore in POINT_MAP) {
        company.score =
          // @ts-ignore
          company.score + POINT_MAP[userScore] * company[scoreName];
      }
    }
  }

  rankedCompanies.sort((a, b) => b.score - a.score);
  const ranked = rankedCompanies.map((c, i) => ({ ...c, rank: i }));

  return ranked;
}
