import { FC } from "react";
import Section from "components/Section/Section";
import Title from "components/Title/Title";
import Caption from "components/Caption/Caption";
import PrimaryButton from "components/PrimaryButton/PrimaryButton";
import SecondaryButton from "components/SecondaryButton/SecondaryButton";
import RangeSlider from "components/RangeSlider/RangeSlider";

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
            <PrimaryButton disabled={true} text={"Add"} className={"w-1/12"} />
            <PrimaryButton disabled={true} text={"Add"} className={"w-1/12"} />
            <PrimaryButton disabled={true} text={"Add"} className={"w-1/12"} />
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
              disabled={true}
              text={"Verify life"}
              className={"w-32 h-12 "}
            />
          </div>
        </>
      </Section>

      <Section className="  space-x-20 justify-between mt-20 ">
        <>
          <div className="card1 bg-white shadow-2xl rounded-xl p-10 w-2/4 flex flex-col ">
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
                  disabled={true}
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
                  disabled={true}
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
