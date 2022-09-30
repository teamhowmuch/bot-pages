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
  RankedCompanyWithRelations,
  CompanyType,
} from "../../lib/models";
import {
  assignRelations,
  filterAlternative,
  filterCurrent,
  rankCompanies,
} from "../../lib/util";

interface Props {
  userId: number;
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
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

function calculateFitColor(
  userCompanies: RankedCompanyWithRelations[],
  companyType: CompanyType
): "green" | "yellow" | "red" | "gray" {
  const current = userCompanies.filter(filterCurrent(companyType));
  const alternatives = userCompanies.filter(filterAlternative(companyType));

  if (current.length === 0) {
    return "gray";
  }

  const bestAlternative = Math.max(...alternatives.map((c) => c.score));
  const worstCurrent = Math.min(...current.map((c) => c.score));
  const differenceRatio = (bestAlternative - worstCurrent) / worstCurrent;

  if (differenceRatio >= 1) {
    return "red";
  } else if (differenceRatio < 1 && differenceRatio >= 0) {
    return "yellow";
  } else {
    return "green";
  }
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
      <div className="p-3 flex gap-2 justify-center mb-12">
        <CompanyButton
          label="Travel insurance"
          emoji="🏝"
          active={selectedCompanyType === "travel_insurance"}
          color={calculateFitColor(userCompanies, "travel_insurance")}
          onClick={() => onClickCompanySelection("travel_insurance")}
        />

        <CompanyButton
          label="Health insurance"
          emoji="🏥"
          active={selectedCompanyType === "health_insurance"}
          color={calculateFitColor(userCompanies, "health_insurance")}
          onClick={() => onClickCompanySelection("health_insurance")}
        />
        <CompanyButton
          label="Banks"
          emoji="🏦"
          active={selectedCompanyType === "banks"}
          color={calculateFitColor(userCompanies, "banks")}
          onClick={() => onClickCompanySelection("banks")}
        />
      </div>
    );
  }

  function renderSelectedCompany() {
    return (
      <Comparison
        chatData={chatData}
        userCompanies={userCompanies}
        selectedComparison={selectedCompanyType}
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
