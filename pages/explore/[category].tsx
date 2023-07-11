import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Container, Navbar } from "../../lib/components";
import {
  getCompanyById,
  listCategories,
  listCompanies,
} from "../../lib/graphql";
import { getCategoryBySlug } from "../../lib/graphql/getCategory";
import { Company, CompanyCategory } from "../../lib/models";

type Props = {
  companyCategory: CompanyCategory;
};

const ExploreCategory: NextPage<Props> = ({ companyCategory }) => {
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
          <h3>Category:</h3>
          {companyCategory.name}
        </Container>
      </main>
    </div>
  );
};

interface Params extends ParsedUrlQuery {
  category: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params as Params;

  console.log("companyCategory", category);
  const companyCategory = await getCategoryBySlug(category);
  console.log(companyCategory);
  return {
    props: { companyCategory },
  };
};

export async function getStaticPaths() {
  const companyCategories = await listCategories();

  const paths = companyCategories.map((category) => ({
    params: { category: category.slug },
  }));

  return { paths, fallback: false };
}

export default ExploreCategory;
