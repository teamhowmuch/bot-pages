import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { push } from "@socialgouv/matomo-next";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import {
  Navbar,
  Container,
  CompanyButton,
  Comparison,
  CardDismissable,
  Icon,
} from "../../lib/components";

import { listCompanies } from "../../lib/graphql";
import {
  ChatData,
  CompanyType,
  RankedCompany,
  UserCompanies,
} from "../../lib/models";
import { getUserCompanies, rankCompanies } from "../../lib/util";

interface Props {
  userId: number;
  chatData: ChatData;
  userCompanies: UserCompanies;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function renderPre() {
  return (
    <div className="py-3 text-center">
      <CardDismissable variant="action">
        <a
          href="https://www.instagram.com/grobothq/"
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            push(["trackEvent", "Results", "Click Follow Instragram"])
          }
        >
          <div className="flex items-center gap-2 justify-center cursor-pointer">
            <Icon icon={faInstagram} size="2x" />
            <span>Follow me on Instagram for regular updates</span>
          </div>
        </a>
      </CardDismissable>
      <p className="mt-3">
        I listened to what you find important and analysed 219 reports on your
        companies.
      </p>
    </div>
  );
}

const colorScale = {
  0: "bg-gray-400",
  1: "bg-red-400",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-green-400",
  5: "bg-green-600",
} as const;

function calculateFitColor(
  companies?: RankedCompany[] | RankedCompany
): string {
  if (!companies) {
    return colorScale[0];
  }
  if (Array.isArray(companies)) {
    if (companies.length === 0) {
      return colorScale[0];
    } else {
      return colorScale[
        Math.min(
          ...companies.map((c) => c.scoreOutOfFive)
        ) as keyof typeof colorScale
      ];
    }
  } else {
    return colorScale[companies.scoreOutOfFive];
  }
}

const ChatResults: NextPage<Props> = ({ userId, chatData, userCompanies }) => {
  // const { user } = useUser({ redirectTo: "/login" });

  const [selectedCompanyType, setSelectedCompanyType] =
    useState<keyof UserCompanies>("healthInsurance");

  const { bot_version } = chatData;

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
      <div className="p-3 flex gap-2 justify-center mb-12">
        <CompanyButton
          label="Travel insurance"
          emoji="🏝"
          active={selectedCompanyType === "travelInsurance"}
          className={calculateFitColor(userCompanies.travelInsurance.current)}
          onClick={() => onClickCompanySelection("travelInsurance")}
        />

        <CompanyButton
          label="Health insurance"
          emoji="🏥"
          active={selectedCompanyType === "healthInsurance"}
          className={calculateFitColor(userCompanies.healthInsurance.current)}
          onClick={() => onClickCompanySelection("healthInsurance")}
        />
        <CompanyButton
          label="Banks"
          emoji="🏦"
          active={selectedCompanyType === "banks"}
          className={calculateFitColor(userCompanies.banks.current)}
          onClick={() => onClickCompanySelection("banks")}
        />
      </div>
    );
  }

  function renderSelectedCompany() {
    return (
      <Comparison
        userCompanies={userCompanies}
        selectedComparison={selectedCompanyType}
        chatData={chatData}
      />
    );
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
  const userCompanies = getUserCompanies(rankedCompanies, chatData);

  return {
    props: {
      userId,
      chatData,
      userCompanies,
    },
  };
};

export default ChatResults;
