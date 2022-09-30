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
  3: 1,
  4: 2,
  5: 3,
} as const;

export function rankCompanies(
  companies: Company[],
  data: ChatData
): RankedCompany[] {
  const totalPointsAllocated = Object.values(data.values).reduce(
    (acc, cur) => acc + Number(cur),
    0
  );

  const rankedCompanies: RankedCompany[] = companies.map((c) => ({
    ...c,
    score: 0,
    rank: 0,
    relativeScore: 0,
  }));

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

  const maxScore = Math.max(...rankedCompanies.map((c) => c.score));
  rankedCompanies.forEach((c) => {
    c.relativeScore = Math.round(c.score / maxScore * 100);
    console.log(
      "maxScore",
      maxScore,
      "score",
      c.score,
      "relativeScore",
      c.relativeScore
    );
  });

  rankedCompanies.sort((a, b) => b.score - a.score);
  const ranked = rankedCompanies.map((c, i) => ({ ...c, rank: i }));

  return ranked;
}
