import { useState } from "react";
import {
  ChatData,
  claimsMap,
  RankedCompanyWithRelations,
  COMPANY_CLAIM_FIELDS,
} from "../models";

interface Props {
  company: RankedCompanyWithRelations;
  chatData: ChatData;
}

export function CompanyClaims({ company, chatData }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { most_important } = chatData;
  const otherInterestingClaims = Object.entries(company)
    // @ts-ignore
    .filter(([key, value]) => COMPANY_CLAIM_FIELDS.includes(key))
    .map(([key, value]) => value);

  console.log(otherInterestingClaims);
  return (
    <ul>
      {expanded ? (
        <>
          {otherInterestingClaims.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
          <li>
            <a
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => setExpanded(false)}
            >
              Okay, too much info
            </a>
          </li>
        </>
      ) : (
        <>
          <li>{company[claimsMap[most_important]]}</li>
          <li>
            <a
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => setExpanded(true)}
            >
              More informations plz
            </a>
          </li>
        </>
      )}
    </ul>
  );
}
