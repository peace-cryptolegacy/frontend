import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import Stepper from 'components/Stepper/Stepper';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import Title from 'components/Title/Title';
import { IBeneficiary } from 'mock';
import { testamentInfoInitialValue } from 'mock/index';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getBeneficiaries,
  getExpirationDays,
  setActiveStep,
  setBeneficiaries,
  setBeneficiariesAffected,
  setExpirationDays,
  setSelectedPlan,
} from 'store/reducers/testamentInfo';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { writeTestament } from 'utils/web3/heritage';

const Steps = () => {
  const dispatch = useAppDispatch();
  const beneficiaries: IBeneficiary[] = useAppSelector(getBeneficiaries);
  const expirationDays: number = useAppSelector(getExpirationDays);
  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];
  const { item: testamentInfo, saveItem: setTestamentInfo } = useLocalStorage(
    'TESTAMENT_INFO',
    testamentInfoInitialValue
  );

  const getUpdatedTestamentInfo = () =>
    JSON.parse(localStorage.getItem('TESTAMENT_INFO')!);

  useEffect(() => {
    dispatch(setSelectedPlan({ selectedPlan: testamentInfo.selectedPlan }));
    dispatch(setActiveStep({ activeStep: testamentInfo.activeStep }));
    dispatch(setBeneficiaries({ beneficiaries: testamentInfo.beneficiaries }));
    dispatch(
      setExpirationDays({ expirationDays: testamentInfo.expirationDays })
    );
    dispatch(
      setBeneficiariesAffected({
        beneficiariesAffected: testamentInfo.beneficiariesAffected,
      })
    );
  }, [dispatch, testamentInfo]);

  const renderStepper = () => {
    return (
      <>
        <Stepper
          steps={stepsLabel}
          className="mb-7"
          activeStep={testamentInfo.activeStep}
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
          onNextStep={() => {
            const updatedTestamentInfo = getUpdatedTestamentInfo();
            dispatch(
              setActiveStep({
                activeStep: 1,
              })
            );
            dispatch(
              setSelectedPlan({
                selectedPlan: updatedTestamentInfo.selectedPlan,
              })
            );
            setTestamentInfo({
              ...updatedTestamentInfo,
              activeStep: 1,
              selectedPlan: updatedTestamentInfo.selectedPlan,
            });
          }}
        />
      ), // <ConnectStep onNextStep={() => setTestamentInfo(1)} />
      key: 'step-connect',
      title: (
        <>
          Time To Protect Our Wealth <span className="text-black">✌</span>
        </>
      ),
    },
    {
      content: (
        <PlanCustomization
          stepperClassName=""
          testamentInfo={testamentInfo}
          renderStepper={() => renderStepper()}
          onPrevStep={() => {
            const updatedTestamentInfo = getUpdatedTestamentInfo();
            setTestamentInfo({ ...updatedTestamentInfo, activeStep: 0 });
          }}
          onNextStep={(
            beneficiaries: IBeneficiary[],
            expirationDays: number
          ) => {
            const updatedTestamentInfo = getUpdatedTestamentInfo();
            dispatch(
              setActiveStep({
                activeStep: 2,
              })
            );

            dispatch(setBeneficiaries(beneficiaries));
            dispatch(setExpirationDays({ expirationDays }));
            setTestamentInfo({
              ...updatedTestamentInfo,
              activeStep: 2,
              expirationDays,
              beneficiaries,
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
          beneficiaries={testamentInfo.beneficiaries}
          expirationDays={testamentInfo.expirationDays}
          onPrevStep={() => {
            const updatedTestamentInfo = getUpdatedTestamentInfo();
            setTestamentInfo({ ...updatedTestamentInfo, activeStep: 1 });
          }}
          onNextStep={() => handleDeploy()}
        />
      ),
      key: 'step-distribution',
      title: 'Reviewing inheritance plan',
    },
  ];

  async function handleDeploy() {
    await writeTestament(beneficiaries, expirationDays);

    window.location.reload();
  }

  function renderTitle() {
    return (
      <>
        <Title text={steps && steps[testamentInfo.activeStep].title}></Title>
      </>
    );
  }

  function renderStep() {
    return steps[testamentInfo.activeStep].content;
  }

  return (
    <div className="mb-12">
      {renderTitle()}
      <div className="w-full rounded-xl bg-white px-32 py-9 drop-shadow-lg">
        {renderStep()}
      </div>
    </div>
  );
};

export default Steps;
