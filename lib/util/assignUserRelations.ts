import { ChatData, RankedCompany, RankedCompanyWithRelations } from "../models";

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
  
      if (chatData.companies.health_insurance.includes(companyName)) {
        company.userRelations.push("healthInsurance");
        const betterAlternative = companies.find(
          (c2) =>
            c2.id !== company.id &&
            c2.score > company.score &&
            c2.sellsHealthInsurance
        );
        if (betterAlternative) {
          betterAlternative.userRelations.push("healthInsuranceAlternative");
          company.hasAlternative = true;
        }
      }
  
      if (chatData.companies.travel_insurance.includes(companyName)) {
        company.userRelations.push("travelInsurance");
        const betterAlternative = companies.find(
          (c2) =>
            c2.id !== company.id &&
            c2.score > company.score &&
            c2.sellsTravelInsurance
        );
        if (betterAlternative) {
          betterAlternative.userRelations.push("travelInsuranceAlternative");
          company.hasAlternative = true;
        }
      }
  
      if (chatData.companies.banks.includes(companyName)) {
        company.userRelations.push("bank");
        const betterAlternative = companies.find(
          (c2) =>
            c2.id !== company.id &&
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
  