import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { CompanyClaims } from "../../lib/components";
import { listCompanies } from "../../lib/hygraph";
import {
  ChatData,
  UserValue,
  Company,
  RankedCompanyWithRelations,
  RankedCompany,
  valueMap,
} from "../../lib/models";
import ThumbsDown from "../../public/gifs/thumbs_down.gif";
import ThumbsUp from "../../public/gifs/thumbs_up.gif";

interface Props {
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
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
      <h1>Your travel insurance</h1>
      <h2>{current.displayNameCompany}</h2>
      {alternative ? (
        <div style={{ width: 200 }}>
          <Image src={ThumbsDown} alt="thumbs_down" layout="responsive" />
        </div>
      ) : (
        <div style={{ width: 200 }}>
          <Image src={ThumbsUp} alt="thumbs_down" layout="intrinsic" />
        </div>
      )}
      <CompanyClaims company={current} chatData={chatData} />
      {alternative ? (
        <>
          <h2>Better alternative:</h2>
          <h1>{alternative.displayNameCompany}</h1>
          <CompanyClaims company={alternative} chatData={chatData} />
          <a href="https://www.sns.nl">
            Go to {alternative.displayNameCompany}
          </a>{" "}
          <br />
          <a href="sources">Sources</a>
        </>
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
  const current = companies.filter((c) => c.userRelations.includes("bank"));
  const alternative = companies.find((c) =>
    c.userRelations.includes("bankAlternative")
  );

  if (current.length === 0) {
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

const ChatResults: NextPage<Props> = ({ chatData, userCompanies }) => {
  const hasSuperBadCompany = true;

  return (
    <div>
      <Head>
        <title>Gretabot 2000 results</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello 🤖</h1>
        <p>
          I have processed your values and analysed 219 reports on your
          companies.
        </p>
        <p>Here is what I found:</p>
        {renderCompanies(chatData, userCompanies)}
      </main>
    </div>
  );
};

const POINT_MAP = {
  1: -2,
  2: -1,
  3: 0,
  4: 2,
  5: 3,
} as const;

function rankCompanies(companies: Company[], data: ChatData): RankedCompany[] {
  const rankedCompanies = companies.map((c) => ({ ...c, score: 0, rank: 0 }));

  for (const company of rankedCompanies) {
    for (let [valueName, scoreName] of Object.entries(valueMap)) {
      const userScore = (data.values[valueName as UserValue] as number) || 3;
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

  return {
    props: { chatData, userCompanies },
  };
};

export default ChatResults;
