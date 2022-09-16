import Image from "next/image";
import { RankedCompanyWithRelations } from "../models";

type Props = {
  company: RankedCompanyWithRelations;
};

export function Company({ company }: Props) {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div style={{ width: 180 }} className="">
          <Image
            src={company.logo.url}
            height={100}
            width={180}
            alt={`logo-${company.displayNameCompany}`}
          />
        </div>
      </div>
    </div>
  );
}
