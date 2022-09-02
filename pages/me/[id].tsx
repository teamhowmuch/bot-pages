import { push } from "@socialgouv/matomo-next";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import {
  CompanyClaims,
  Company as CompanyComponent,
  Navbar,
  Button,
  Container,
  CompanyButton,
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
import { associateSession, trackEvent as tr } from "../../lib/tracking";
import { assignRelations, rankCompanies } from "../../lib/util";
import IdkGif from "../../public/gifs/trump_idk.gif";

interface Props {
  userId: number;
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function renderNothingToSeeHere() {
  return (
    <div className="py-5 rounded">
      <div className="py-10 text-center">
        <h1 className="text-3xl">Nothing to see here</h1>
        <div className="py-6 flex justify-center">
          <Image src={IdkGif} alt="i don't know" width={480} height={233} />
        </div>
      </div>
    </div>
  );
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
    return renderNothingToSeeHere();
  }

  return (
    <div className="py-5 rounded">
      <div className="py-10">
        <h1 className="text-3xl py-3">Your {label} insurance</h1>
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
              <div className="p-2 bg-white">
                <h5 className="text-xl">
                  {alternative.displayNameCompany} base pricing: €
                  {label === "health"
                    ? alternative.costHealthInsurance
                    : alternative.costTravelInsurance}
                  /month{" "}
                  <small>
                    ({current.displayNameCompany} = €
                    {label === "health"
                      ? current.costHealthInsurance
                      : current.costTravelInsurance}
                    /month)
                  </small>
                </h5>

                <div className="flex gap-1">
                  <a
                    href={
                      label === "health"
                        ? alternative.healthURL
                        : alternative.travelURL
                    }
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Alternative",
                        label,
                        `${alternative.displayNameCompany} DIRECT`,
                      ])
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
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Alternative",
                        label,
                        `${alternative.displayNameCompany} INDEPENDER`,
                      ])
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
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Alternative",
                        label,
                        `${alternative.displayNameCompany} POLISWIJZER`,
                      ])
                    }
                    target="blank"
                  >
                    <Button>Compare on PolisWijzer</Button>
                  </a>
                </div>
              </div>
            </div>
            <br />
            <a href="https://www.grobot.com/how">Sources</a>
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
    return renderNothingToSeeHere();
  }

  return (
    <div className="py-5 rounded">
      <div className="py-10">
        <h1 className="text-3xl py-3">Your banks</h1>
        {current.map((c) => (
          <div key={c.id}>
            <CompanyComponent
              company={c}
              chatData={chatData}
              isAlternative={true}
            />
          </div>
        ))}
        {alternative ? (
          <>
            <h1 className="text-3xl pt-5">Better fit for you</h1>
            <div className="py-3">
              <h5 className="text-xl"></h5>
              <CompanyComponent
                company={alternative}
                chatData={chatData}
                isAlternative={true}
              />
            </div>
            <div className="py-3">
              <div className="p-2 bg-white">
                <h5 className="text-xl">
                  Base price bank account at {alternative.displayNameCompany} €
                  {alternative.costBankaccount}/mo
                  <small>
                    {" "}
                    (
                    {current
                      .map(
                        (c) =>
                          `${c.displayNameCompany}: €${c.costBankaccount}/mo`
                      )
                      .join(", ")}
                    )
                  </small>
                </h5>
                <a
                  href={alternative.bankURL}
                  target="blank"
                  onClick={() =>
                    push([
                      "trackEvent",
                      "Results",
                      "Click Alternative",
                      "bank",
                      `${alternative.displayNameCompany} Direct`,
                    ])
                  }
                >
                  <Button>Go to {alternative.displayNameCompany}</Button>
                </a>
                <br />
              </div>
            </div>
          </>
        ) : (
          <p>It is the best, no alternative!</p>
        )}
        <a href="https://www.grobot.com/how">Sources</a>
      </div>
    </div>
  );
}

function renderPre() {
  return (
    <div className="py-3 text-center">
      <p>
        I listened to what you find important and analysed 219 reports on your
        companies.
      </p>
    </div>
  );
}

const ChatResults: NextPage<Props> = ({ userId, chatData, userCompanies }) => {
  const [selectedCompanyType, setSelectedCompanyType] =
    useState<CompanyType>("health_insurance");

  const { bot_version, email } = chatData;

  useEffect(() => {
    push(["enableLinkTracking"]);
    push(["enableHeartBeatTimer"]);
    push(["trackPageView"]);
    push(["trackAllContentImpressions"]);
    push(["setUserId", userId]);
  }, [userId]);

  if (!bot_version || parseInt(bot_version[0]) < 4) {
    return (
      <h1>
        Older chat version error{" "}
        <small>(version: {bot_version || "unknown"})</small>
      </h1>
    );
  }

  // ------
  // event handlers
  function onClickCompanySelection(type: CompanyType) {
    push(["trackEvent", "Results", "Click Company Type", type]);

    setSelectedCompanyType(type);
  }

  // ------
  // rendering
  function renderCompanySelection() {
    return (
      <div className="py-3 flex gap-2 justify-center">
        <CompanyButton
          label="Travel insurance"
          emoji="🏝"
          active={selectedCompanyType === "travel_insurance"}
          color="green"
          onClick={() => onClickCompanySelection("travel_insurance")}
        />
        <CompanyButton
          label="Health insurance"
          emoji="🏥"
          active={selectedCompanyType === "health_insurance"}
          color="green"
          onClick={() => onClickCompanySelection("health_insurance")}
        />
        <CompanyButton
          label="Banks"
          emoji="🏦"
          active={selectedCompanyType === "banks"}
          color="green"
          onClick={() => onClickCompanySelection("banks")}
        />
      </div>
    );
  }

  function renderSelectedCompany() {
    if (selectedCompanyType === "health_insurance") {
      return renderInsurance(
        chatData,
        userCompanies,
        "healthInsurance",
        "healthInsuranceAlternative",
        "health"
      );
    } else if (selectedCompanyType === "travel_insurance") {
      return renderInsurance(
        chatData,
        userCompanies,
        "travelInsurance",
        "travelInsuranceAlternative",
        "travel"
      );
    } else if (selectedCompanyType === "banks") {
      return renderBanks(chatData, userCompanies);
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-3">
        <Head>
          <title>Grobot 2000 results</title>
          <meta name="description" content="Some meta" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Container>
            <>
              {renderPre()}
              {renderCompanySelection()}
              {renderSelectedCompany()}
            </>
          </Container>
        </main>
      </div>
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
  const userId = json.user_id;

  const allCompanies = await listCompanies();
  const rankedCompanies = rankCompanies(allCompanies, chatData);
  const withUserRelations = assignRelations(rankedCompanies, chatData);

  const userCompanies = withUserRelations.filter(
    (c) => c.userRelations.length > 0
  );

  return {
    props: {
      userId,
      chatData,
      userCompanies,
    },
  };
};

export default ChatResults;
