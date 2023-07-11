import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { getCompanyById, listCompanies } from "../../lib/graphql";
import { Company } from "../../lib/models";
import { promiseTimeout } from "../../lib/util";

type Props = {
  company: Company;
};

const Me: NextPage<Props> = ({ company }) => {
  return (
    <div>
      <Head>
        <title>Gretabot 2000 result</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>Company:</h3>
        {company.displayNameCompany}
        {company.climateScore}
        {company.climateClaims}
      </main>
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;
  const company = await getCompanyById(id);
  if (process.env.NODE_ENV === "production") {
    console.log("wait 1000!");
    await promiseTimeout(1000);
  }

  return {
    props: { company },
  };
};

export async function getStaticPaths() {
  const companies = await listCompanies();
  const paths = companies.map((c) => ({ params: { id: c.id } }));
  return { paths, fallback: false };
}

export default Me;
