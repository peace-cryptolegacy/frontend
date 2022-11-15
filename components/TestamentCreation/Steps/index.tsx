// @ts-nocheck

import { writeTestament } from 'utils/web3/heritage';
import { useState } from 'react';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import Stepper from 'components/Stepper/Stepper';
import Title from 'components/Title/Title';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { initialValue } from 'mock/index';

// interface UserData {
//   activeStep: string;
//   beneficiaries?: [];
// }

const Steps = () => {
  // const [activeStep, setUserData] = useState<number>(0);
  const [beneficiaries, setBeneficiares] = useState({});
  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];
  console.log('first');
  // const [activeStep, setUserData] = useLocalStorage('activeStep', 0);
  const { item: userData, saveItem: setUserData } = useLocalStorage(
    'USER_DATA',
    initialValue
  );
  console.log('second : ', userData.activeStep);

  const renderStepper = () => {
    return (
      <>
        <Stepper
          steps={stepsLabel}
          className="mb-7"
          activeStep={userData.activeStep}
        />
        <HorizontalRule />
      </>
    );
  };
  const steps = [
    {
      content: (
        <PlanSelection
          stepperClassName=""
          renderStepper={() => renderStepper()}
          onNextStep={() => setUserData({ ...userData, activeStep: 1 })}
        />
      ), // <ConnectStep onNextStep={() => setUserData(1)} />
      key: 'step-connect',
      title: 'Time To Protect Our Wealth ✌️',
    },
    {
      content: (
        <PlanCustomization
          stepperClassName=""
          renderStepper={() => renderStepper()}
          onPrevStep={() => setUserData({ ...userData, activeStep: 0 })}
          onNextStep={(beneficiaries: any, expiration: any) => {
            setUserData({ ...userData, activeStep: 2 });
            setBeneficiares({
              beneficiaries,
              expiration,
            });
          }}
        />
      ),
      key: 'step-beneficiaries',
      title: 'Creating inheritance plan',
    },
    {
      content: (
        <PlanReview
          stepperClassName=""
          renderStepper={() => renderStepper()}
          beneficiaries={beneficiaries}
          onPrevStep={() => setUserData({ ...userData, activeStep: 1 })}
          onNextStep={() => handleDeploy()}
        />
      ),
      key: 'step-distribution',
      title: 'Reviewing inheritance plan',
    },
  ];

  async function handleDeploy() {
    await writeTestament(beneficiaries.beneficiaries, beneficiaries.expiration);

    window.location.reload();
  }

  function renderTitle() {
    return (
      <>
        <Title text={steps && steps[userData.activeStep].title}></Title>
      </>
    );
  }

  function renderStep() {
    return steps[userData.activeStep].content;
  }

  // function renderStep(
  //   { content }: { content: any; key: string; title: string },
  //   index: number
  // ) {
  //   // setUserData(activeStep);
  //   return (
  //     <div key={index}>{index === userData.activeStep ? content : <></>}</div>
  //   );
  // }

  return (
    <div className="mb-12">
      {renderTitle()}
      <div className="w-fit rounded-xl bg-white px-32 py-9 drop-shadow-lg">
        {renderStep(steps)}
        {/* {steps.map(renderStep)} */}
      </div>
    </div>
  );
};

export default Steps;
