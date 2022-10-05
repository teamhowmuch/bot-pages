import { push } from "@socialgouv/matomo-next";
import Image from "next/image";
import { ChatData, CompanyType, RankedCompany, UserCompanies } from "../models";
import { Button } from "./Button";
import { Card } from "./Card";
import { Company } from "./Company";
import { CompanyRating } from "./CompanyRating";
import { NothingToSeeHere } from "./NothingToSeeHere";
import { Title } from "./Title";
import YesGif from "../../public/gifs/yes.gif";
import classNames from "classnames";

type Props = {
  userCompanies: UserCompanies;
  selectedComparison: CompanyType;
  chatData: ChatData;
};

const sectionTitles: Record<CompanyType, string> = {
  healthInsurance: "current health insurance",
  travelInsurance: "current travel insurance",
  banks: "current banks",
};

export function Comparison({
  userCompanies,
  selectedComparison,
  chatData,
}: Props) {
  const current = userCompanies[selectedComparison].current;
  const alternatives = userCompanies[selectedComparison].alternatives;

  // ------
  // rendering
  function renderCurrent() {
    if (current.length === 0) {
      return <NothingToSeeHere />;
    }

    return (
      <div className="">
        {current.map((c, i) => (
          <div key={`c${c.id}`}>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
              <div className="col-span-1">
                <Company company={c} />
              </div>
              <div className="col-span-2">
                <CompanyRating company={c} chatData={chatData} />
              </div>
            </div>
            {i < alternatives.length - 1 && <hr className="my-6" />}
          </div>
        ))}
      </div>
    );
  }

  function renderAlternatives() {
    return (
      <div className="grid">
        {alternatives.map((a, i) => (
          <div key={`a${a.id}`}>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
              <div className="col-span-1">
                <Company company={a} />
              </div>
              <div className="col-span-2">
                <CompanyRating company={a} chatData={chatData} />
              </div>
            </div>
            {i < alternatives.length - 1 && <hr className="my-6" />}
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
              <span className="font-bold">Match</span>
            </td>
            {[...current, ...alternatives].map((c) => (
              <td key={c.id} className={classNames("text-center")}>
                <span
                  className={classNames("p-1 rounded text-white", {
                    "bg-red-400": c.scoreOutOfFive === 1,
                    "bg-orange-400": c.scoreOutOfFive === 2,
                    "bg-yellow-400": c.scoreOutOfFive === 3,
                    "bg-green-400": c.scoreOutOfFive === 4,
                    "bg-green-600": c.scoreOutOfFive === 5,
                  })}
                >
                  {c.relativeScore}%
                </span>
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-right">
              <span className="font-bold">Base pricing</span>
            </td>
            {current.map((c) => (
              <td scope="col" key={c.id} className="text-center font-bold">
                €{c.costTravelInsurance}/month
              </td>
            ))}
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`} className="text-center">
                €{a.costTravelInsurance}/month
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-right">
              <span className="font-bold">Website</span>
            </td>
            {current.map((c) => (
              <td key={c.id} />
            ))}

            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`} className="text-center">
                <div className="inline-block py-3">
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
                  {a.travelURL.includes("awin") && (
                    <span className="text-xs">👆 Affiliate</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td className="text-right p-2">
              <span className="font-bold">Compare</span>
            </td>
            <td colSpan={alternatives.length + current.length}>
              <div className="flex gap-1 py-3 justify-center">
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
              <Card variant="gray" className="max-w-lg">
                <h6 className="font-bold">Affiliate links</h6>
                <p className="text-sm mb-2">
                  As you know, I&apos;m all about transparency, also when it
                  comes to my own actions.
                </p>
                <p className="text-sm ">
                  To keep my servers running and my makers fed I&apos;m
                  currently experimenting with affiliate links. I promise to
                  never promote or boost results for companies I receive an
                  affiliate commission on. I will mark all affiliate links❗️
                </p>
              </Card>
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
            You&apos;ll probably do your own research, but here are some things
            that might help you decide:
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
                  <span className="font-bold">Match</span>
                </td>
                {[...current, ...alternatives].map((c) => (
                  <td key={c.id} className={classNames("text-center")}>
                    <span
                      className={classNames("p-1 rounded text-white", {
                        "bg-red-400": c.scoreOutOfFive === 1,
                        "bg-orange-400": c.scoreOutOfFive === 2,
                        "bg-yellow-400": c.scoreOutOfFive === 3,
                        "bg-green-400": c.scoreOutOfFive === 4,
                        "bg-green-600": c.scoreOutOfFive === 5,
                      })}
                    >
                      {c.relativeScore}%
                    </span>
                  </td>
                ))}
              </tr>

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
                  <span className="font-bold">Apple Pay</span>
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
                  <span className="font-bold">Google Pay</span>
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
                {current.map((e) => (
                  <td key={e.id} />
                ))}
                {alternatives.map((a) => (
                  <td scope="col" key={`td-${a.id}`} className="text-center">
                    <div className="py-3 text-center inline-block">
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
                  <Card variant="gray" className="max-w-lg">
                    <h6 className="font-bold">Affiliate links</h6>
                    <p className="text-sm ">
                      I ❤️ transparency. To keep my servers running and my
                      makers fed I&apos;m currently experimenting with affiliate
                      links. I promise to never promote or boost results for
                      companies I receive an affiliate commission on. I will
                      mark all affiliate links❗️
                    </p>
                  </Card>
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
              <span className="font-bold">Match</span>
            </td>
            {[...current, ...alternatives].map((c) => (
              <td key={c.id} className={classNames("text-center")}>
                <span
                  className={classNames("p-1 rounded text-white", {
                    "bg-red-400": c.scoreOutOfFive === 1,
                    "bg-orange-400": c.scoreOutOfFive === 2,
                    "bg-yellow-400": c.scoreOutOfFive === 3,
                    "bg-green-400": c.scoreOutOfFive === 4,
                    "bg-green-600": c.scoreOutOfFive === 5,
                  })}
                >
                  {c.relativeScore}%
                </span>
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-2 text-right">
              <span className="font-bold">Base pricing</span>
            </td>
            {current.map((c) => (
              <td scope="col" key={c.id} className="text-center">
                €{c.costHealthInsurance}
              </td>
            ))}
            {alternatives.map((a) => (
              <td
                scope="col"
                key={`td-${a.id}`}
                className="text-center bg-gray-100"
              >
                €{a.costHealthInsurance}
              </td>
            ))}
          </tr>

          <tr>
            <td></td>
            <td></td>
            {alternatives.map((a) => (
              <td scope="col" key={`td-${a.id}`} className="text-center">
                <div className="inline-block py-3">
                  <a
                    href={a.healthURL}
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
                  {a.healthURL.includes("awin") && (
                    <span className="text-xs">❗️ Affiliate (read more below)</span>
                  )}
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
              <Card variant="gray" className="max-w-lg">
                <h6 className="font-bold">Affiliate links</h6>
                <p className="text-sm ">
                  I ❤️ transparency. To keep my servers running and my makers
                  fed I&apos;m currently experimenting with affiliate links. I
                  promise to never promote or boost results for companies I
                  receive an affiliate commission on. I will mark all affiliate
                  links❗️
                </p>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  function renderMain() {
    return (
      <div>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <h3 className="uppercase text-center mb-3 text-gray-400">
              {sectionTitles[selectedComparison]}
            </h3>
            {renderCurrent()}
          </Card>

          <Card>
            {alternatives.length > 0 ? (
              <>
                <h3 className="uppercase text-center mb-3 text-gray-400">
                  Suggested alternatives
                </h3>
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
              <Title align="center">How to Switch</Title>
              {selectedComparison === "healthInsurance" && renderHealthSwitch()}
              {selectedComparison === "travelInsurance" && renderTravelSwitch()}
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

  return renderMain();
}
