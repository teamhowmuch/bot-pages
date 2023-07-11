import classNames from "classnames";
import { HTMLProps } from "react";
import { Company, CompanyBase } from "../models";
import { CompanyListItem } from "./CompanyListItem";

type Props = HTMLProps<HTMLDivElement> & { companies: CompanyBase[] };

export function CompanyList({ companies }: Props) {
  return (
    <div className="">
      {companies.map((company) => (
        <CompanyListItem key={company.id} company={company} />
      ))}
    </div>
  );
}
