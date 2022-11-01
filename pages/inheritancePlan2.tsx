import { FC } from "react";
import Section from "components/Section/Section";
import Title from "components/Title/Title";
import Description from "components/Desription/Description";
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
            <Description
              text="Your profile: 0x797...31A9"
              className="text-black my-5 text-left"
            ></Description>
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
              <Description
                text="Days since inactivity"
                className="text-black text-left "
              ></Description>
              <Description
                text="0 Days"
                className="text-black text-left text-2xl"
              ></Description>
              <Description
                text="Moonbase"
                className="text-black text-left "
              ></Description>
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
    </div>
  );
};

export default CreatePlan;
