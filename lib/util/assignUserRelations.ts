import {
  ChatData,
  CompanyRelation,
  CompanyType,
  RankedCompany,
  RankedCompanyWithRelations,
} from "../models";

export const currentRelationMap: Record<CompanyType, CompanyRelation> = {
  health_insurance: "healthInsurance",
  travel_insurance: "travelInsurance",
  banks: "bank",
};

export const alternativeRelationMap: Record<CompanyType, CompanyRelation> = {
  health_insurance: "healthInsuranceAlternative",
  travel_insurance: "travelInsuranceAlternative",
  banks: "bankAlternative",
};

export function filterCurrent(selectedCompanyType: CompanyType) {
  return (company: RankedCompanyWithRelations) =>
    company.userRelations.includes(currentRelationMap[selectedCompanyType]);
}

export function filterAlternative(selectedCompanyType: CompanyType) {
  return (company: RankedCompanyWithRelations) =>
    company.userRelations.includes(alternativeRelationMap[selectedCompanyType]);
}

function matchName(
  chatDataString: string | null | undefined,
  companyName: string | null | undefined
): boolean {
  if (!chatDataString || !companyName) {
    return false;
  }
  return chatDataString.toLowerCase().includes(companyName.toLowerCase());
}

export function assignRelations(
  rankedCompanies: RankedCompany[],
  chatData: ChatData
): RankedCompanyWithRelations[] {
  const companies: RankedCompanyWithRelations[] = rankedCompanies.map((c) => ({
    ...c,
    userRelations: [],
    hasAlternative: false,
  }));

  return companies.map((company, index, companies) => {
    const companyName = company.displayNameCompany;

    if (
      matchName(chatData.companies.health_insurance, companyName) &&
      company.sellsHealthInsurance
    ) {
      company.userRelations.push("healthInsurance");
      const betterAlternative = companies.find(
        (c2) =>
          c2.id !== company.id &&
          c2.recommend &&
          c2.score > company.score &&
          c2.sellsHealthInsurance
      );
      if (betterAlternative) {
        betterAlternative.userRelations.push("healthInsuranceAlternative");
        company.hasAlternative = true;
      }
    }

    if (
      matchName(chatData.companies.travel_insurance, companyName) &&
      company.sellsTravelInsurance
    ) {
      company.userRelations.push("travelInsurance");
      const betterAlternative = companies.find(
        (c2) =>
          c2.id !== company.id &&
          c2.recommend &&
          c2.score > company.score &&
          c2.sellsTravelInsurance
      );
      if (betterAlternative) {
        betterAlternative.userRelations.push("travelInsuranceAlternative");
        company.hasAlternative = true;
      }
    }

    if (
      chatData.companies.banks &&
      chatData.companies.banks
        .map((n) => n.toLowerCase())
        .includes(companyName.toLowerCase()) &&
      company.sellsBankaccount
    ) {
      company.userRelations.push("bank");
      const betterAlternative = companies.find(
        (c2) =>
          c2.id !== company.id &&
          c2.recommend &&
          c2.score > company.score &&
          c2.sellsBankaccount
      );
      if (betterAlternative) {
        betterAlternative.userRelations.push("bankAlternative");
        company.hasAlternative = true;
      }
    }
    return company;
  });
}
