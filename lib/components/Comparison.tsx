import { push } from "@socialgouv/matomo-next";
import Image from "next/image";
import {
  ChatData,
  CompanyRelation,
  CompanyType,
  RankedCompanyWithRelations,
} from "../models";
import { Button } from "./Button";
import { Card } from "./Card";
import { Company } from "./Company";
import { CompanyRating } from "./CompanyRating";
import { NothingToSeeHere } from "./NothingToSeeHere";
import { Title } from "./Title";
import YesGif from "../../public/gifs/yes.gif";
import {
  alternativeRelationMap,
  currentRelationMap,
  filterAlternative,
  filterCurrent,
} from "../util";

type Props = {
  selectedComparison: CompanyType;
  chatData: ChatData;
  userCompanies: RankedCompanyWithRelations[];
};

const sectionTitles: Record<CompanyType, string> = {
  health_insurance: "Your health insurance",
  travel_insurance: "Your travel insurance",
  banks: "Your bank",
};

export function Comparison({
  selectedComparison,
  userCompanies,
  chatData,
}: Props) {
  const current = userCompanies.filter(filterCurrent(selectedComparison));
  const alternatives = userCompanies.filter(
    filterAlternative(selectedComparison)
  );

  // ------
  // rendering
  function renderCurrent() {
    return (
      <div className="grid gap-2 grid-col-1 md:grid-cols-2 ">
        {current.map((c) => (
          <div key={`c${c.id}`}>
            <Company company={c} />
            <CompanyRating company={c} chatData={chatData} />
          </div>
        ))}
      </div>
    );
  }

  function renderAlternatives() {
    return (
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
        {alternatives.map((a) => (
          <div key={`a${a.id}`}>
            <Company company={a} />
            <CompanyRating company={a} chatData={chatData} />
          </div>
        ))}
      </div>
    );
  }

  function renderTravelSwitch() {
    return (
      <table className="min-w-full my-3">
        <thead className="border-b">
          <tr>
            <th scope="col"></th>
            {current.map((c) => (
              <th scope="col" key={c.id}>
                <span className="font-bold">{c.displayNameCompany}</span>
                <div style={{ width: 36 }} className="">
                  <Image
                    src={c.logo.url}
                    height={20}
                    width={36}
                    alt={`logo-${c.displayNameCompany}`}
                  />
                </div>
              </th>
            ))}
            {alternatives.map((a) => (
              <th scope="col" key={`th-${a.id}`}>
                {a.displayNameCompany}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="font-bold">Base pricing</span>
            </td>
            {current.map((c) => (
              <td scope="col" key={c.id}>
                €{c.costTravelInsurance}
              </td>
            ))}
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`}>
                €{a.costTravelInsurance}
              </td>
            ))}
          </tr>

          <tr>
            <td></td>
            {current.map((c) => (
              <td scope="col" key={c.id}>
                <div className="py-3">
                  <a
                    href={c.travelURL}
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Current",
                        "travel insurance",
                        `${c.displayNameCompany} DIRECT`,
                      ])
                    }
                    target="blank"
                  >
                    <Button>Go to {c.displayNameCompany}</Button>
                  </a>
                </div>
              </td>
            ))}
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`}>
                <div className="py-3">
                  <a
                    href={a.travelURL}
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Alternative",
                        "travel insurance",
                        `${a.displayNameCompany} DIRECT`,
                      ])
                    }
                    target="blank"
                  >
                    <Button>Go to {a.displayNameCompany}</Button>
                  </a>
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td>
              <span className="font-bold">Compare</span>
            </td>
            <td colSpan={alternatives.length + current.length}>
              <div className="flex gap-1 py-3">
                <a
                  href="https://www.independer.nl/reisverzekering/intro.aspx"
                  onClick={() =>
                    push([
                      "trackEvent",
                      "Results",
                      "Click Alternative",
                      "travel insurance",
                      `INDEPENDER`,
                    ])
                  }
                  target="blank"
                >
                  <Button>Compare on Independer</Button>
                </a>
                <a
                  href="https://www.poliswijzer.nl/reisverzekering"
                  onClick={() =>
                    push([
                      "trackEvent",
                      "Results",
                      "Click Alternative",
                      "travel insurance",
                      `POLISWIJZER`,
                    ])
                  }
                  target="blank"
                >
                  <Button>Compare on PolisWijzer</Button>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={100}>
              I don&apos;t receive a commission on any of these links.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function renderBankSwitch() {
    return (
      <div>
        <div className="py-3">
          <Title variant="h2">
            1️⃣ Know it&apos;s probably easier than you think
          </Title>
          <div className="grid grid-col-1 gap-2 py-3">
            <div>
              👉 65% of people who consider switching don&apos;t because they
              believe it&apos;s too much of a hassle 😩.
            </div>
            <div>
              👉 75% of people who <strong>do</strong> make the switch rate the
              process as easy or super easy 💪.
            </div>
            <div>👉 90% of people make the switch in under 15 minutes 🙋</div>
            <div>
              👉 90% of couples who have a shared bank account do it in under 20
              minutes 🙋🙋🏼‍♀️
            </div>
          </div>
        </div>
        <div className="py-3">
          <Title variant="h2">
            2️⃣ make sure this alternative suits your needs.
          </Title>
          <p>
            You&apos;ll probably do your own research, but here are some things that might help you decide:
          </p>
          <table className="min-w-full my-3">
            <thead className="border-b">
              <tr>
                <th scope="col"></th>
                {current.map((c) => (
                  <th scope="col" key={c.id}>
                    <span className="font-bold">{c.displayNameCompany}</span>
                  </th>
                ))}
                {alternatives.map((a) => (
                  <th scope="col" key={`th-${a.id}`}>
                    {a.displayNameCompany}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Base pricing</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    €{c.costBankaccount}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    €{a.costBankaccount}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Rating</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    {c.bankRatingConsumentenbond}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    {a.bankRatingConsumentenbond}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Service rating</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    {c.serviceRatingBankingConsumentenbond}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    {a.serviceRatingBankingConsumentenbond}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Online/App banking rating</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    {c.onlineBankingRatingConsumentenbond}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    {a.onlineBankingRatingConsumentenbond}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Has Apple Pay</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    {c.hasApplePay ? "✅" : "❌"}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    {a.hasApplePay ? "✅" : "❌"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-2 text-right">
                  <span className="font-bold">Has Google Pay</span>
                </td>
                {current.map((c) => (
                  <td scope="col" key={c.id} className="text-center">
                    {c.hasGooglePay ? "✅" : "❌"}
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    {a.hasGooglePay ? "✅" : "❌"}
                  </td>
                ))}
              </tr>

              <tr>
                <td></td>
                {current.map((c) => (
                  <td scope="col" key={c.id}>
                    <div className="py-3 text-center">
                      <a
                        href={c.bankURL}
                        onClick={() =>
                          push([
                            "trackEvent",
                            "Results",
                            "Click Current",
                            "bank",
                            `${c.displayNameCompany} DIRECT`,
                          ])
                        }
                        target="blank"
                      >
                        <Button>Go to {c.displayNameCompany}</Button>
                      </a>
                    </div>
                  </td>
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`}>
                    <div className="py-3 text-center">
                      <a
                        href={a.bankURL}
                        onClick={() =>
                          push([
                            "trackEvent",
                            "Results",
                            "Click Alternative",
                            "bank",
                            `${a.displayNameCompany} DIRECT`,
                          ])
                        }
                        target="blank"
                      >
                        <Button>Go to {a.displayNameCompany}</Button>
                      </a>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td></td>
                <td colSpan={100}>
                  <span className="text-gray-400">
                    I don&apos;t receive a commission on any of these links.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="py-3">
            <Title variant="h2">
              3️⃣ Use the overstapservice when opening a bank account.
            </Title>
            <div className="grid grid-col-1 gap-2 py-3">
              <div>
                ✅ Overstapservice automatically forwards all monthly payments
                to your new bank account for 13 months. After, creditors
                automatically switch to your new bank accounts.
              </div>
            </div>
          </div>

          <div className="py-3">
            <Title variant="h2">
              4️⃣ Close your old bank account after 3 months.
            </Title>
            <div className="grid grid-col-1 gap-2 py-3">
              <div>
                💰 Many people incur extra costs because they tend to forget to
                cancel their old bank. After 3 months, all your monthly payments
                have definitely been switched over.
              </div>
            </div>
          </div>

          <div className="py-3">
            <Title variant="h2">
              5️⃣ Let your old bank, new bank and social network know
            </Title>
            <div className="grid grid-col-1 gap-2 py-3">
              <div>
                Whether you have 5 or 5 million followers, let the world know
                you&apos;ve made the switch! Make sure to tag your old bank and
                new bank and tell them why you switched.
              </div>
            </div>
          </div>

          <div className="py-3">
            <Title variant="h2">6️⃣ Don&apos;t postpone</Title>
            <div className="grid grid-col-1 gap-2 py-3">
              <div>
                Whether you have 5 or 5 million followers, let the world know
                you&apos;ve made the switch! Make sure to tag your old bank and
                new bank and tell them why you switched.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderHealthSwitch() {
    return (
      <table className="min-w-full my-3 ">
        <thead className="border-b">
          <tr>
            <th scope="col" className="text-left"></th>
            {current.map((c) => (
              <th scope="col" key={c.id}>
                {c.displayNameCompany}
              </th>
            ))}
            {alternatives.map((a) => (
              <th scope="col" key={`th-${a.id}`}>
                {a.displayNameCompany}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-right">
              <span className="font-bold">Base pricing</span>
            </td>
            {current.map((c) => (
              <td scope="col" key={c.id}>
                €{c.costHealthInsurance}
              </td>
            ))}
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`}>
                €{a.costHealthInsurance}
              </td>
            ))}
          </tr>

          <tr>
            <td></td>
            {current.map((c) => (
              <td scope="col" key={c.id}>
                <div className="py-3">
                  <a
                    href={c.healthURL}
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Current",
                        "health insurance",
                        `${c.displayNameCompany} DIRECT`,
                      ])
                    }
                    target="blank"
                  >
                    <Button>Go to {c.displayNameCompany}</Button>
                  </a>
                </div>
              </td>
            ))}
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`}>
                <div className="py-3">
                  <a
                    href={a.travelURL}
                    onClick={() =>
                      push([
                        "trackEvent",
                        "Results",
                        "Click Alternative",
                        "health insurance",
                        `${a.displayNameCompany} DIRECT`,
                      ])
                    }
                    target="blank"
                  >
                    <Button>Go to {a.displayNameCompany}</Button>
                  </a>
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td>
              <span className="font-bold">Compare</span>
            </td>
            <td colSpan={alternatives.length + current.length}>
              <div className="flex gap-1 py-3">
                <a
                  href="https://www.independer.nl/zorgverzekering/intro.aspx"
                  onClick={() =>
                    push([
                      "trackEvent",
                      "Results",
                      "Click Alternative",
                      "health insurance",
                      `INDEPENDER`,
                    ])
                  }
                  target="blank"
                >
                  <Button>Compare on Independer</Button>
                </a>
                <a
                  href="https://www.poliswijzer.nl/zorgverzekering"
                  onClick={() =>
                    push([
                      "trackEvent",
                      "Results",
                      "Click Alternative",
                      "health insurance",
                      `POLISWIJZER`,
                    ])
                  }
                  target="blank"
                >
                  <Button>Compare on PolisWijzer</Button>
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td></td>
            <td colSpan={100}>
              I don&apos;t receive a commission on any of these links.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function renderMain() {
    return (
      <div>
        <div className="py-5">
          <Title align="center">{sectionTitles[selectedComparison]}</Title>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Card>{renderCurrent()}</Card>

          <Card>
            {alternatives.length > 0 ? (
              <>
                <Title>Alternatives you might consider</Title>
                {renderAlternatives()}
              </>
            ) : (
              <>
                <Title>I didn&apos;t find a better match for you!</Title>
                <Image src={YesGif} alt="yess" width={500} height={230} />
              </>
            )}
          </Card>

          {alternatives.length > 0 && (
            <Card>
              <Title>How to Switch</Title>
              {selectedComparison === "health_insurance" &&
                renderHealthSwitch()}
              {selectedComparison === "travel_insurance" &&
                renderTravelSwitch()}
              {selectedComparison === "banks" && renderBankSwitch()}
            </Card>
          )}

          <Card>
            <a href="https://www.grobot.nl/how" className="underline">
              Sources
            </a>
          </Card>
        </div>
      </div>
    );
  }

  if (current.length === 0) {
    return <NothingToSeeHere />;
  } else {
    return renderMain();
  }
}
