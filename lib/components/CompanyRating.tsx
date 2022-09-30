import { push } from "@socialgouv/matomo-next";
import { useMemo, useState } from "react";
import {
  ChatData,
  claimsMap,
  RankedCompanyWithRelations,
  COMPANY_CLAIM_FIELDS,
  UserValue,
  Company,
} from "../models";
import { Card, CardVariant } from "./Card";

interface Props {
  company: RankedCompanyWithRelations;
  chatData: ChatData;
}

const valueLabels: Record<UserValue, string> = {
  animal_welfare: "Stop animal factory farming",
  biodiversity: "Protecting biodiversity",
  ceo_pay: "Fair worker pay",
  climate: "Reducing fossil fuels",
  fair_pay: "Fair pay",
  gender_equality: "Promote gender equality",
  tax_evasion_sucks: "Stop tax evasion",
  weapons_are_ok: "Don't invest in weapons",
};

const valueToEmoji: Record<UserValue, string> = {
  animal_welfare: "🐖",
  biodiversity: "🐝",
  ceo_pay: "👨‍🔧",
  climate: "🔥",
  fair_pay: "💸",
  gender_equality: "🧑‍🤝‍🧑",
  tax_evasion_sucks: "💸",
  weapons_are_ok: "🔫",
};

const valueToScore: Record<
  UserValue,
  | "animalScore"
  | "climateScore"
  | "antiWeaponsScore"
  | "natureScore"
  | "antiTaxAvoidanceScore"
  | "equalityScore"
  | "fairPayScore"
> = {
  animal_welfare: "animalScore",
  biodiversity: "natureScore",
  ceo_pay: "fairPayScore",
  climate: "climateScore",
  fair_pay: "fairPayScore",
  gender_equality: "equalityScore",
  tax_evasion_sucks: "antiTaxAvoidanceScore",
  weapons_are_ok: "antiWeaponsScore",
};

function renderClaim(
  value: UserValue,
  importance: number,
  company: RankedCompanyWithRelations
) {
  const valueScore = company[valueToScore[value]];
  let scoreColor: string = "bg-red-500 text-white";
  if (valueScore > 25) scoreColor = "bg-orange-500 text-white";
  if (valueScore > 40) scoreColor = "bg-yellow-500 text-white";
  if (valueScore > 65) scoreColor = "bg-green-400 text-white ";
  if (valueScore > 80) scoreColor = "bg-green-500 text-white";

  return (
    <Card variant={"gray"} className="h-full">
      {importance === 6 && (
        <p className="text-center text-sm text-gray-500 uppercase">
          most important to you
        </p>
      )}
      <h6 className="text-6xl text-center my-6">{valueToEmoji[value]}</h6>
      <h6 className="font-bold text-center my-3">{valueLabels[value]}</h6>

      <div className="flex justify-center">
        <div className={`text-center w-20 p-2 rounded-xl ${scoreColor}`}>
          <h6 className="uppercase text-xs">score</h6>
          <h6 className="text-4xl">{Math.round(valueScore / 10)}</h6>
        </div>
      </div>

      {/* <h6 className="font-bold">Rating: {Math.round(valueScore / 10)}/10</h6> */}
      <h6 className="font-bold mt-3">Why</h6>
      <p className="text-xs">{company[claimsMap[value]]}</p>
      {/* <p>{company[valueToScore[value]]}</p>
      <p>{importance}</p>
      <p>{importance}</p> */}
    </Card>
  );
}

export function CompanyRating({ company, chatData }: Props) {
  // -----
  // rendering
  function renderClaims() {
    const { values, most_important } = chatData;

    return (
      <div>
        {renderClaim(most_important, 6, company)}
        <div className="overflow-x-scroll flex gap-2 mt-3">
          {Object.entries(values)
            .sort((a, b) => b[1] - a[1])
            .filter(([valueName]) => valueName !== most_important)
            .map(([valueName, value]) => (
              <div key={valueName} style={{ minWidth: 250 }}>
                {renderClaim(valueName as UserValue, value, company)}
              </div>
            ))}
        </div>
      </div>
    );

    return;
  }

  return <div className="">{renderClaims()}</div>;
}
