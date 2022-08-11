import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { CompanyClaims } from "../../lib/components";
import { listCompanies } from "../../lib/graphql";
import {
  ChatData,
  UserValue,
  Company,
  RankedCompanyWithRelations,
  RankedCompany,
  valueMap,
  CompanyType,
  CompanyRelation,
} from "../../lib/models";
import { assignRelations, rankCompanies } from "../../lib/util";
import ThumbsDown from "../../public/gifs/thumbs_down.gif";
import ThumbsUp from "../../public/gifs/thumbs_up.gif";

interface Props {
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function renderInsurance(
  chatData: ChatData,
  companies: RankedCompanyWithRelations[],
  companyRelation: CompanyRelation,
  alternativeRelation: CompanyRelation,
  label: "travel" | "health"
) {
  const current = companies.find((c) =>
    c.userRelations.includes(companyRelation)
  );
  const alternative = companies.find((c) =>
    c.userRelations.includes(alternativeRelation)
  );

  if (!current) {
    return null;
  }

  return (
    <div>
      <h1>Your {label} insurance</h1>
      <h2>{current.displayNameCompany}</h2>
      <div style={{ width: 200 }}>
        <Image
          src={current.logo.url}
          width={200}
          height={150}
          alt={`logo-${current.displayNameCompany}`}
        />
      </div>
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
          <div style={{ width: 200 }}>
            <Image
              src={current.logo.url}
              width={200}
              height={150}
              alt={`logo-${current.displayNameCompany}`}
            />
          </div>
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
      {renderInsurance(
        chatData,
        companies,
        "travelInsurance",
        "travelInsuranceAlternative",
        "travel"
      )}
      {renderInsurance(
        chatData,
        companies,
        "healthInsurance",
        "healthInsuranceAlternative",
        "health"
      )}
      {renderBanks(chatData, companies)}
    </div>
  );
}

const ChatResults: NextPage<Props> = ({ chatData, userCompanies }) => {
  const { bot_version } = chatData;
  console.log("bot_version", bot_version);
  if (!bot_version || parseInt(bot_version[0]) < 4) {
    return (
      <h1>
        Older chat version error{" "}
        <small>(version: {bot_version || "unknown"})</small>
      </h1>
    );
  }

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
