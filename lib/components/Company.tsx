import Image from "next/image";
import { RankedCompany } from "../models";
import classNames from "classnames";

type Props = {
  company: RankedCompany;
};

export function Company({ company }: Props) {
  return (
    <div className="text-center py-6">
      <div style={{ width: 180 }} className="mx-auto">
        <Image
          src={company.logo.url}
          height={100}
          width={180}
          alt={`logo-${company.displayNameCompany}`}
        />
      </div>
      <h5 className="text-lg">You &amp; {company.displayNameCompany}</h5>
      <h5 className="text-lg">Overall match: {company.relativeScore}%</h5>

      <div
        className="
          mx-auto my-3 w-48 h-2 rounded-full overflow-hidden bg-gray-200"
      >
        <div
          className={classNames("h-full", {
            "bg-red-400": company.scoreOutOfFive === 1,
            "bg-orange-400": company.scoreOutOfFive === 2,
            "bg-yellow-400": company.scoreOutOfFive === 3,
            "bg-green-400": company.scoreOutOfFive === 4,
            "bg-green-600": company.scoreOutOfFive === 5,
          })}
          style={{ width: `${company.relativeScore}%` }}
        />
      </div>
      <h3 className="text-8xl">
        {company.scoreOutOfFive === 1 && "🧟‍♀️"}
        {company.scoreOutOfFive === 2 && "🤦‍♂️"}
        {company.scoreOutOfFive === 3 && "🤷‍♂️"}
        {company.scoreOutOfFive === 4 && "💆‍♂️"}
        {company.scoreOutOfFive === 5 && "🤴"}
      </h3>
    </div>
  );
}
