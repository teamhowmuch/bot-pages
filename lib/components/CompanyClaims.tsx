import { useMemo, useState } from "react";
import {
  ChatData,
  claimsMap,
  RankedCompanyWithRelations,
  COMPANY_CLAIM_FIELDS,
  UserValue,
} from "../models";
import { trackEvent } from "../tracking";

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

function renderClaim(
  value: UserValue,
  importance: number,
  company: RankedCompanyWithRelations
) {
  return (
    <div>
      <h6 className="font-bold">{valueLabels[value]}</h6>
      <p>{company[claimsMap[value]]}</p>
    </div>
  );
}

function renderClaims(
  expanded: boolean,
  company: RankedCompanyWithRelations,
  chatData: ChatData
) {
  const { most_important, values } = chatData;
  if (expanded) {
    return Object.entries(values).map(([valueName, value]) => {
      return renderClaim(
        valueName as UserValue,
        valueName === most_important ? 6 : value,
        company
      );
    });
  } else {
    return [renderClaim(most_important, 6, company)];
  }
}

export function CompanyClaims({ company, chatData }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { most_important } = chatData;
  const otherInterestingClaims = Object.entries(company)
    // @ts-ignore
    .filter(([key, value]) => COMPANY_CLAIM_FIELDS.includes(key))
    .map(([key, value]) => value);

  const claims = useMemo(
    () => renderClaims(expanded, company, chatData),
    [expanded, company, chatData]
  );

  return (
    <>
      <h6 className="text-xl">
        How does {company.displayNameCompany} perform?
      </h6>
      <ul>
        {claims.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        <li>
          <a
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => {
              trackEvent({
                action: "Click more information",
                category: "click",
                data: { company: company.displayNameCompany },
              });
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Too much info" : "More informations plz"}
          </a>
        </li>
      </ul>
    </>
  );
}
