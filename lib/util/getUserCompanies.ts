import { ChatData, CompanyType, RankedCompany, UserCompanies } from "../models";

function matchName(
  chatDataString: string | null | undefined,
  companyName: string | null | undefined
): boolean {
  if (!chatDataString || !companyName) {
    return false;
  }
  return chatDataString.toLowerCase().includes(companyName.toLowerCase());
}

export function getUserCompanies(
  companies: RankedCompany[],
  chatData: ChatData
): UserCompanies {
  const healthInsurance = companies.find((company) => {
    const companyName = company.displayNameCompany;
    return (
      matchName(chatData.companies.health_insurance, companyName) &&
      company.sellsHealthInsurance
    );
  });

  const healthInsuranceAlternatives = companies
    .filter(
      (alternative) =>
        alternative.id !== healthInsurance?.id &&
        alternative.sellsHealthInsurance &&
        alternative.recommend &&
        alternative.score >= (healthInsurance?.score || 0)
    )
    .slice(0, 2);

  const travelInsurance = companies.find((company) => {
    const companyName = company.displayNameCompany;
    return (
      matchName(chatData.companies.travel_insurance, companyName) &&
      company.sellsHealthInsurance
    );
  });

  const travelInsuranceAlternatives = companies
    .filter(
      (alternative) =>
        alternative.id !== travelInsurance?.id &&
        alternative.sellsTravelInsurance &&
        alternative.recommend &&
        alternative.score >= (healthInsurance?.score || 0)
    )
    .slice(0, 2);

  const banks = companies.filter((company) => {
    const companyName = company.displayNameCompany;
    return chatData.companies.banks
      .map((n) => n.toLowerCase())
      .includes(companyName.toLowerCase());
  });

  const maxBankScore = Math.max(...banks.map((bank) => bank.score));

  const bankAlternatives = companies
    .filter(
      (alternative) =>
        !banks.map((b) => b.id).includes(alternative.id) &&
        alternative.sellsBankaccount &&
        alternative.recommend &&
        alternative.score >= maxBankScore
    )
    .slice(0, 2);

  return {
    healthInsurance: {
      current: healthInsurance ? [healthInsurance] : [],
      alternatives: healthInsuranceAlternatives,
    },
    travelInsurance: {
      current: travelInsurance ? [travelInsurance] : [],
      alternatives: travelInsuranceAlternatives,
    },
    banks: {
      current: banks,
      alternatives: bankAlternatives,
    },
  };
}
