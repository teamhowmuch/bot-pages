import { useMemo, useState } from "react";
import {
  ChatData,
  claimsMap,
  RankedCompanyWithRelations,
  COMPANY_CLAIM_FIELDS,
  UserValue,
} from "../models";

interface Props {
  company: RankedCompanyWithRelations;
  chatData: ChatData;
}

const valueLabels: Record<UserValue, string> = {
  animal_welfare: "Animal factory farming",
  biodiversity: "Biodiversity",
  ceo_pay: "Fair pay",
  climate: "Climate",
  fair_pay: "Fair pay",
  gender_equality: "Gender equality",
  tax_evasion_sucks: "Tax evasion",
  weapons_are_ok: "Weapons",
};

function makeClaimString(
  value: UserValue,
  importance: number,
  company: RankedCompanyWithRelations
): string {
  return `${valueLabels[value]}: ${company[claimsMap[value]]}`;
}

function filterClaims(
  expanded: boolean,
  company: RankedCompanyWithRelations,
  chatData: ChatData
): string[] {
  const { most_important, values } = chatData;
  if (expanded) {
    return Object.entries(values).map(([valueName, value]) => {
      return makeClaimString(
        valueName as UserValue,
        valueName === most_important ? 6 : value,
        company
      );
    });
  } else {
    return [makeClaimString(most_important, 6, company)];
  }
}

export function CompanyClaims({ company, chatData }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { most_important } = chatData;
  const otherInterestingClaims = Object.entries(company)
    // @ts-ignore
    .filter(([key, value]) => COMPANY_CLAIM_FIELDS.includes(key))
    .map(([key, value]) => value);

  const shownClaims = useMemo<string[]>(
    () => filterClaims(expanded, company, chatData),
    [expanded, company, chatData]
  );

  return (
    <ul>
      {shownClaims.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
      <li>
        <a
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Too much info" : "More informations plz"}
        </a>
      </li>
    </ul>
  );
}
