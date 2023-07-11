import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  Card,
  Company,
  CompanyList,
  Container,
  Navbar,
  Title,
} from "../../lib/components";
import {
  listBanks,
  listCategories,
  listCompanies,
  listFeaturedCategories,
  listInsurance,
} from "../../lib/graphql";
import {
  Company as CompanyModel,
  CompanyCategory,
  CompanyCategoryWithCompanies,
} from "../../lib/models";

type Props = {
  companyCategories: CompanyCategoryWithCompanies[];
};

const ExplorePage: NextPage<Props> = ({ companyCategories }) => {
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
          <div>
            <Title className="text-6xl text-center">
              Find companies that <strong>do</strong> sustainble.
            </Title>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {companyCategories.map((category) => (
              <Card key={category.id}>
                <Link href={`/explore/${category.slug}`}>
                  <a>
                    <Title>{category.name}</Title>
                  </a>
                </Link>
                <CompanyList companies={category.companies} />
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const companyCategories = await listFeaturedCategories();

  return {
    props: { companyCategories },
  };
};

export default ExplorePage;
