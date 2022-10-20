import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container, Navbar } from "../../lib/components";
import { listCompanies } from "../../lib/graphql";
import { Company } from "../../lib/models";

type Props = {
  companies: Company[];
};

function renderCompany(company: Company) {
  return (
    <div key={company.id}>
      <Link href={`/companies/${company.id}`}>
        <a>
          <h6>{company.displayNameCompany}</h6>
        </a>
      </Link>
    </div>
  );
}

const Me: NextPage<Props> = ({ companies }) => {
  return (
    <div>
      <Head>
        <title>Gretabot 2000 result</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <Container>
          <h3>Companies:</h3>
          {companies.map((c) => renderCompany(c))}
        </Container>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const companies = await listCompanies();

  return {
    props: { companies },
  };
}

export default Me;
