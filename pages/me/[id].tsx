import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import {
  CompanyClaims,
  Company as CompanyComponent,
  Navbar,
  Button,
  Container,
} from "../../lib/components";
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

interface Props {
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
  debugAllCompanies?: RankedCompanyWithRelations[];
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
    <div className="py-5 rounded">
      <hr />

      <div className="py-10">
        <h1 className="text-3xl">Your {label} insurance</h1>
        <CompanyComponent
          company={current}
          chatData={chatData}
          isAlternative={false}
        />
        {alternative ? (
          <>
            <h1 className="text-3xl pt-5">Better fit for you</h1>
            <CompanyComponent
              company={alternative}
              chatData={chatData}
              isAlternative={true}
            />
            <div className="py-3">
              <h5 className="text-l">{alternative.displayNameCompany}</h5>
              <div className="flex gap-1">
                <a
                  href={
                    label === "health"
                      ? alternative.healthURL
                      : alternative.travelURL
                  }
                  target="blank"
                >
                  <Button>Go to {alternative.displayNameCompany}</Button>
                </a>
                <a
                  href={
                    label === "health"
                      ? "https://www.independer.nl/zorgverzekering/intro.aspx"
                      : "https://www.independer.nl/reisverzekering/intro.aspx"
                  }
                  target="blank"
                >
                  <Button>Compare on Independer</Button>
                </a>
                <a
                  href={
                    label === "health"
                      ? "https://www.poliswijzer.nl/zorgverzekering"
                      : "https://www.poliswijzer.nl/reisverzekering/doorlopende/vergelijken"
                  }
                  target="blank"
                >
                  <Button>Compare on PolisWijzer</Button>
                </a>
              </div>
            </div>
            <br />
            <a href="https://www.gretabot.com/how">Sources</a>
          </>
        ) : (
          <p>It is the best, no alternative!</p>
        )}
      </div>
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
      <hr />
      <h1>Your Banks</h1>
      {current.map((c) => (
        <div key={c.id}>
          <CompanyComponent
            company={c}
            chatData={chatData}
            isAlternative={true}
          />
        </div>
      ))}
      <h1 className="text-3xl pt-5">Best fit for your values</h1>
      {alternative ? (
        <div>
          <CompanyComponent
            company={alternative}
            chatData={chatData}
            isAlternative={true}
          />
          <a href={alternative.bankURL} target="blank">
            Go to {alternative.displayNameCompany}
          </a>
          <br />
          <a href="https://www.gretabot.com/how">Sources</a>
        </div>
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
  const [showDebug, setShowDebug] = useState(false);

  const { bot_version } = chatData;

  if (!bot_version || parseInt(bot_version[0]) < 4) {
    return (
      <h1>
        Older chat version error{" "}
        <small>(version: {bot_version || "unknown"})</small>
      </h1>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="p-3">
          <Head>
            <title>Gretabot 2000 results</title>
            <meta name="description" content="Some meta" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <div className="py-3">
              <p>
                I listened to what you find important and analysed 219 reports
                on your companies.
              </p>
            </div>

            {renderCompanies(chatData, userCompanies)}

            <div
              style={{ height: 50, width: "100%", display: "block" }}
              onClick={() => setShowDebug(!showDebug)}
            />
            {showDebug && (
              <code>
                Chatdata:
                <pre>{JSON.stringify(chatData, null, 4)}</pre>
              </code>
            )}
          </main>
        </div>
      </Container>
    </>
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
    props: {
      chatData,
      userCompanies,
    },
  };
};

export default ChatResults;
