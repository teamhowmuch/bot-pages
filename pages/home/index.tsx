import {
  faPiggyBank,
  faPlaneCircleCheck,
  faPlaneDeparture,
  faStarOfLife,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Card,
  Container,
  Icon,
  Navbar,
  TextInput,
  Title,
} from "../../lib/components";

type CompanyTileProps = {
  name: string;
  companyType: string;
};

function CompanyTile({ name, companyType }: CompanyTileProps) {
  return (
    <Card className="text-center" variant="success">
      <div style={{ height: 300, width: 200 }}>
        <Title variant="h3">{name}</Title>
        <Title variant="h3">{companyType}</Title>
        <p>Match: 45%</p>
        <p>Better alternative: 95%</p>
      </div>
    </Card>
  );
}

const Me: NextPage = () => {
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
          <h1 className="text-5xl pt-6">Better brands</h1>
          <h6 className="text-xl pb-y">better you</h6>
        </Container>

        <div className="py-6 px-3 grid gap-6 grid-cols-1">
          <Container>
            <Card>
              <div className="flex">
                <TextInput placeholder="Search... " />
              </div>
            </Card>
          </Container>
          <Container>
            <Card>
              <Title className="pb-6" variant="h3">
                YOUR MONTHLY EXPENSES
              </Title>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                <Card
                  className="flex items-center aspect-square"
                  variant="action"
                >
                  <div className="flex flex-col justify-center items-center w-full gap-3">
                    <Icon icon={faStethoscope} size="3x" />
                    <Title variant="h3">Health insurance</Title>
                  </div>
                </Card>
                <Card
                  className="flex items-center aspect-square "
                  variant="action"
                >
                  <div className="flex flex-col justify-center items-center w-full gap-3">
                    <Icon icon={faPlaneDeparture} size="3x" />
                    <Title variant="h3">Travel insurance</Title>
                  </div>
                </Card>
                <Card
                  className="flex items-center aspect-square "
                  variant="action"
                >
                  <div className="flex flex-col justify-center items-center w-full gap-3">
                    <Icon icon={faPiggyBank} size="3x" />
                    <Title variant="h3">Banks</Title>
                  </div>
                </Card>
              </div>
            </Card>
          </Container>
          <div>
            <Container>
              <div className="flex">
                <Title className="pb-6" variant="h2">
                  Track your brands
                </Title>
              </div>
            </Container>
            <div className="flex gap-2 overflow-x-scroll">
              <div
                className="block"
                style={{ paddingLeft: "calc((100vw - 1024px) / 2 - 16px)" }}
              />
              <CompanyTile name="FBTO" companyType="Travel insurance" />
              <CompanyTile name="ASR" companyType="Health insurance" />
              <CompanyTile name="BUNQ" companyType="Bank" />
              <CompanyTile name="ING Bank" companyType="Bank" />
              <CompanyTile name="ING Bank" companyType="Bank" />
              <CompanyTile name="ING Bank" companyType="Bank" />
              <CompanyTile name="ING Bank" companyType="Bank" />
              <CompanyTile name="ING Bank" companyType="Bank" />
            </div>
          </div>
          <Container>
            <Card>
              <Title>Discover</Title>
              <p className="pb-6"></p>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <CompanyTile name="FBTO" companyType="Travel insurance" />
                <CompanyTile name="ASR" companyType="Health insurance" />
                <CompanyTile name="BUNQ" companyType="Bank" />
                <CompanyTile name="ING Bank" companyType="Bank" />
              </div>
            </Card>
          </Container>
          <Container>
            <Card>
              <Title>Greenwasher of the month awards</Title>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"></div>
            </Card>
          </Container>
          <Container>
            <Card>
              <Title>Greenleader of the month awards</Title>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"></div>
            </Card>
          </Container>
        </div>
      </main>
    </div>
  );
};
export default Me;
