import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Company, getTravelInsurance, listCompanies } from "../../lib/hygraph";

type CompanyScores = Pick<
  Company,
  | "fairPayScore"
  | "natureScore"
  | "climateScore"
  | "fairPayScore"
  | "animalScore"
  | "antiTaxAvoidanceScore"
  | "antiWeaponsScore"
  | "equalityScore"
>;
type CompanyScore = keyof CompanyScores;

interface ChatData {
  id: string;

  travel_insurance: string;
  health_insurance: string;
  banks: string;

  ceo_pay: number;
  biodiversity: number;
  climate: number;
  fair_pay: number;
  animal_welfare: number;
  tax_evasion_sucks: number;
  weapons_are_ok: number;
  gender_equality: number;
}

type UserValues = Omit<
  ChatData,
  "id" | "travel_insurance" | "health_insurance" | "banks"
>;
type UserValue = keyof UserValues;

type ValueMap = Record<UserValue, CompanyScore>;

const valueMap: ValueMap = {
  ceo_pay: "fairPayScore",
  biodiversity: "natureScore",
  climate: "climateScore",
  fair_pay: "fairPayScore",
  animal_welfare: "animalScore",
  tax_evasion_sucks: "antiTaxAvoidanceScore",
  weapons_are_ok: "antiWeaponsScore",
  gender_equality: "equalityScore",
};

type CompanyRelation =
  | "superBad"
  | "travelInsurance"
  | "healthInsurance"
  | "bank"
  | "superBadAlternative"
  | "travelInsuranceAlternative"
  | "healthInsuranceAlternative"
  | "bankAlternative";

type UserCompanies = Record<
  CompanyRelation,
  {
    current?: Company;
    alternative?: Company;
  }
>;

interface Props {
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
  debugCompanies: RankedCompanyWithRelations[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function renderTravelInsurance(
  chatData: ChatData,
  companies: RankedCompanyWithRelations[]
) {
  const current = companies.find((c) =>
    c.userRelations.includes("travelInsurance")
  );
  const alternative = companies.find((c) =>
    c.userRelations.includes("travelInsuranceAlternative")
  );

  if (!current) {
    return null;
  }

  return (
    <div>
      <h4>Travel insurance</h4>
      <p>
        Current: {current.displayNameCompany} (debug score: {current.score})
      </p>
      {alternative ? (
        <p>
          Better alternative: {alternative.displayNameCompany} (debug score:
          {alternative.score})
        </p>
      ) : (
        <p>It is the best, no alternative!</p>
      )}
    </div>
  );
}

function renderHealthInsurance(
  chatData: ChatData,
  companies: RankedCompanyWithRelations[]
) {
  const current = companies.find((c) =>
    c.userRelations.includes("healthInsurance")
  );
  const alternative = companies.find((c) =>
    c.userRelations.includes("healthInsuranceAlternative")
  );

  if (!current) {
    return null;
  }

  return (
    <div>
      <h4>Health insurance</h4>
      <p>
        Current: {current.displayNameCompany} (debug score: {current.score})
      </p>
      {alternative ? (
        <p>
          Better alternative: {alternative.displayNameCompany} (debug score:
          {alternative.score})
        </p>
      ) : (
        <p>It is the best, no alternative!</p>
      )}
    </div>
  );
}

function renderBanks(
  chatData: ChatData,
  companies: RankedCompanyWithRelations[]
) {
  const current = companies.filter((c) =>
    c.userRelations.includes("healthInsurance")
  );
  const alternative = companies.find((c) =>
    c.userRelations.includes("healthInsuranceAlternative")
  );

  if (!current) {
    return null;
  }

  return (
    <div>
      <h4>Banks</h4>
      <p>
        Current:{" "}
        {current.map(
          (c) => `${c.displayNameCompany} (debug score: ${c.score})`
        )}
      </p>
      {alternative ? (
        <p>
          Better alternative: {alternative.displayNameCompany} (debug score:
          {alternative.score})
        </p>
      ) : (
        <p>It is the best, no alternative!</p>
      )}
    </div>
  );
}

function renderCompanies(
  chatData: ChatData,
  companies: RankedCompanyWithRelations[]
) {
  return (
    <div>
      {renderTravelInsurance(chatData, companies)}
      {renderHealthInsurance(chatData, companies)}
      {renderBanks(chatData, companies)}
    </div>
  );
}

const ChatResults: NextPage<Props> = ({
  chatData,
  userCompanies,
  debugCompanies,
}) => {
  const hasSuperBadCompany = true;

  return (
    <div>
      <Head>
        <title>Gretabot 2000 results</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello</h1>
        <p>
          I have processed your values and analysed 219 reports on your
          companies.
        </p>
        <p>Here is what I found:</p>
        {renderCompanies(chatData, userCompanies)}
        <hr />
        <h5>Debug info</h5>
        <code>
          <pre>{JSON.stringify(debugCompanies, null, 2)}</pre>
        </code>
      </main>
    </div>
  );
};

interface RankedCompany extends Company {
  score: number;
  rank: number;
}

interface RankedCompanyWithRelations extends RankedCompany {
  userRelations: CompanyRelation[];
  hasAlternative: boolean;
}

const POINT_MAP = {
  1: -100,
  2: -50,
  3: 0,
  4: 50,
  5: 100,
} as const;

function rankCompanies(companies: Company[], data: ChatData): RankedCompany[] {
  const rankedCompanies = companies.map((c) => ({ ...c, score: 0, rank: 0 }));

  for (const company of rankedCompanies) {
    for (let [valueName, scoreName] of Object.entries(valueMap)) {
      const userScore = (data[valueName as UserValue] as number) || 3;
      console.log("userScore");
      console.log(userScore);
      // @ts-ignore
      console.log(data[valueName]);
      if (userScore in POINT_MAP) {
        company.score =
          // @ts-ignore
          company.score + POINT_MAP[userScore] * company[scoreName];
      }
    }
  }

  rankedCompanies.sort((a, b) => b.score - a.score);
  const ranked = rankedCompanies.map((c, i) => ({ ...c, rank: i }));

  return ranked;
}

function assignRelations(
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

    if (chatData.health_insurance.includes(companyName)) {
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

    if (chatData.travel_insurance.includes(companyName)) {
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

    if (chatData.banks.includes(companyName)) {
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

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params as Params;
  const res = await fetch(`${process.env.API_HOST}/chats/${id}`);
  const json = await res.json();

  const chatData = json.data;

  const allCompanies = await listCompanies();
  const rankedCompanies = rankCompanies(allCompanies, chatData);
  const withUserRelations = assignRelations(rankedCompanies, chatData);

  const userCompanies = withUserRelations.filter(
    (c) => c.userRelations.length > 0
  );
  console.log(userCompanies);

  return {
    props: { chatData, userCompanies, debugCompanies: withUserRelations },
  };
};

export default ChatResults;
