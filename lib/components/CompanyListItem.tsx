import classNames from "classnames";
import Image from "next/image";
import { HTMLProps } from "react";
import { Company, CompanyBase } from "../models";

type Props = HTMLProps<HTMLDivElement> & { company: CompanyBase };

export function CompanyListItem({ company }: Props) {
  return (
    <div className="flex gap-3 border-b-gray-200 border-1">
      <div style={{ width: 50 }}>
        <Image
          src={company.logo.url}
          height={28}
          width={50}
          alt={`logo-${company.displayNameCompany}`}
        />
      </div>
      {company.displayNameCompany}
    </div>
  );
}
