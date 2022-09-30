import Image from "next/image";
import { RankedCompanyWithRelations } from "../models";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classNames from "classnames";

type Props = {
  company: RankedCompanyWithRelations;
};

export function Company({ company }: Props) {
  const ratingFive =
    company.relativeScore < 30
      ? 1
      : company.relativeScore < 45
      ? 2
      : company.relativeScore < 60
      ? 3
      : company.relativeScore < 80
      ? 4
      : 5;

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
            "bg-red-400": ratingFive === 1,
            "bg-orange-400": ratingFive === 2,
            "bg-yellow-400": ratingFive === 3,
            "bg-green-400": ratingFive === 4,
            "bg-green-600": ratingFive === 5,
          })}
          style={{ width: `${company.relativeScore}%` }}
        />
      </div>
      <h3 className="text-8xl">
        {ratingFive === 1 && "🧟‍♀️"}
        {ratingFive === 2 && "🤦‍♂️"}
        {ratingFive === 3 && "🤷‍♂️"}
        {ratingFive === 4 && "💆‍♂️"}
        {ratingFive === 5 && "🤴"}
      </h3>
    </div>
  );
}
