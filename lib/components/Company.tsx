import Image from "next/image";
import {
  ChatData,
  CompanyRelation,
  RankedCompanyWithRelations,
} from "../models";
import { CompanyClaims } from "./CompanyClaims";
import ThumbsDown from "../../public/gifs/thumbs_down.gif";
import ThumbsUp from "../../public/gifs/thumbs_up.gif";

type Props = {
  company: RankedCompanyWithRelations;
  chatData: ChatData;
  isAlternative: boolean;
};

function renderRatingGif(hasAlternative: boolean) {
  if (hasAlternative) {
    return (
      <div style={{ width: 200 }}>
        <Image src={ThumbsDown} alt="thumbs_down" layout="responsive" />
      </div>
    );
  } else {
    return (
      <div style={{ width: 200 }}>
        <Image src={ThumbsUp} alt="thumbs_down" layout="intrinsic" />
      </div>
    );
  }
}

export function Company({ company, chatData, isAlternative }: Props) {
  return (
    <div className="bg-white rounded-xl p-3">
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
      <CompanyClaims company={company} chatData={chatData} />
    </div>
  );
}
