import { FC } from "react";
import Section from "components/Section/Section";
import Title from "components/Title/Title";
import Caption from "components/Caption/Caption";
import PrimaryButton from "components/PrimaryButton/PrimaryButton";
import SecondaryButton from "components/SecondaryButton/SecondaryButton";
import RangeSlider from "components/RangeSlider/RangeSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreatePlan: FC = () => {
  return (
    <div className="px-20 py-10">
      <Section className="flex-col">
        <>
          <Title text="Welcome to your cryptolegacy!"></Title>
          <div className="flex">
            <Caption
              text="Your profile: 0x797...31A9"
              className="text-black my-5 text-left"
            ></Caption>
            <SecondaryButton text={"Edit"} className="" />
          </div>
          <div className="flex space-x-3">
            <PrimaryButton
              icon={<FontAwesomeIcon icon={["fab", "twitter"]} />}
              disabled={true}
              text={"Add"}
              className={"w-1/12 text-green"}
            />
            <PrimaryButton
              icon={<FontAwesomeIcon icon="envelope" />}
              disabled={true}
              text={"Add"}
              className={"w-1/12"}
            />
            <PrimaryButton
              icon={<FontAwesomeIcon icon={["fab", "discord"]} />}
              disabled={true}
              text={"Add"}
              className={"w-1/12"}
            />
          </div>
        </>
      </Section>

      <Title text="Inheritance plan" className="pt-20 pb-10"></Title>

      <Section className="bg-white shadow-2xl rounded-xl p-10">
        <>
          <Section className="flex-col px-0 py-0 p-0 w-1/4 justify-center">
            <>
              <Caption
                text="Days since inactivity"
                className="text-black text-left "
              ></Caption>
              <Caption
                text="0 Days"
                className="text-black text-left text-2xl"
              ></Caption>
              <Caption
                text="Moonbase"
                className="text-black text-left "
              ></Caption>
            </>
          </Section>

          <Section className="flex-col w-2/4 justify-center">
            <>
              <RangeSlider />
              <p>Last proof of life: Wed Jun 22, 12:43:23 GMT-0500</p>
            </>
          </Section>

          <div className="flex w-1/4 justify-end items-center">
            <SecondaryButton text={"Edit"} className="h-12 " />
            <PrimaryButton
              disabled={false}
              text={"Verify life"}
              className={"w-32 h-12 "}
            />
          </div>
        </>
      </Section>

      <Section className="  space-x-20 justify-between mt-20 ">
        <>
          <div className="card1 bg-white shadow-2xl rounded-xl p-10 w-2/4 flex flex-col">
            <div className="flex mb-6">
              <label className="relative block w-3/4">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <FontAwesomeIcon icon="magnifying-glass" />
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search pools or token address"
                  type="text"
                  name="search"
                />
              </label>
              <div className="text-green w-1/4 flex justify-end items-center cursor-pointer">
                <FontAwesomeIcon icon="sliders" />
              </div>
            </div>

            <div className="flex justify-between mb-10">
              <div className="flex flex-col justify-center">
                <Caption
                  text="Assets on Peace"
                  className="text-black "
                ></Caption>
                <Caption text="$0" className="text-black text-2xl"></Caption>
              </div>

              <div className="flex w-1/4 justify-end items-center">
                <SecondaryButton text={"Edit"} className="h-12 " />
                <PrimaryButton
                  disabled={false}
                  text={"Add tokens"}
                  className={"w-auto h-auto "}
                />
              </div>
            </div>
            <table className="table-auto text-left">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>Balance</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card2 bg-white shadow-2xl rounded-xl p-10 w-2/4 flex flex-col ">
            <div className="flex mb-6">
              <label className="relative block w-3/4">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <FontAwesomeIcon icon="magnifying-glass" />
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search pools or token address"
                  type="text"
                  name="search"
                />
              </label>
              <div className="text-green w-1/4 flex justify-end items-center cursor-pointer">
                <FontAwesomeIcon icon="sliders" />
              </div>
            </div>
            <div className="flex justify-between mb-10">
              <div className="flex flex-col justify-between">
                <Caption
                  text="Assets on Peace"
                  className="text-black "
                ></Caption>
                <Caption text="$0" className="text-black text-2xl"></Caption>
              </div>

              <div className="flex w-1/4 justify-end items-center">
                <SecondaryButton text={"Edit"} className="h-12 " />
                <PrimaryButton
                  disabled={false}
                  text={"Add beneficiaries"}
                  className={"w-auto h-auto "}
                />
              </div>
            </div>
            <table className="table-auto text-left">
              <thead>
                <tr>
                  <th>Beneficiary</th>
                  <th>Tokens</th>
                  <th>% Funds</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      </Section>
    </div>
  );
};

export default CreatePlan;
