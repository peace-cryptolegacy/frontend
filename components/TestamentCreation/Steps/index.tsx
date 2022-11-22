// @ts-nocheck

import { writeTestament } from 'utils/web3/heritage';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import Stepper from 'components/Stepper/Stepper';
import Title from 'components/Title/Title';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { initialValue } from 'mock/index';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  setActiveStep,
  setSelectedPlan,
  setExpirationDays,
  setBeneficiariesAffected,
  setBeneficiaries,
  getBeneficiaries,
} from 'store/reducers/testamentInfo';
import { useEffect } from 'react';
import { IBeneficiary } from 'mock';

const Steps = () => {
  const dispatch = useAppDispatch();
  const beneficiaries: [] = useAppSelector(getBeneficiaries);
  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];
  const { item: userData, saveItem: setUserData } = useLocalStorage(
    'TESTAMENT_INFO',
    initialValue
  );

  const getUpdatedUserData = () =>
    JSON.parse(localStorage.getItem('TESTAMENT_INFO'));

  useEffect(() => {
    dispatch(setSelectedPlan({ selectedPlan: userData.selectedPlan }));
    dispatch(setActiveStep({ activeStep: userData.activeStep }));
    dispatch(setBeneficiaries({ beneficiaries: userData.beneficiaries }));
    dispatch(setExpirationDays({ expirationDays: userData.expirationDays }));
    dispatch(
      setBeneficiariesAffected({
        beneficiariesAffected: userData.beneficiariesAffected,
      })
    );
  }, [dispatch, userData]);

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
          onNextStep={() => {
            const updatedUserData = getUpdatedUserData();
            dispatch(
              setActiveStep({
                activeStep: 1,
              })
            );
            dispatch(
              setSelectedPlan({
                selectedPlan: updatedUserData.selectedPlan,
              })
            );
            setUserData({
              ...updatedUserData,
              activeStep: 1,
              selectedPlan: updatedUserData.selectedPlan,
            });
          }}
        />
      ), // <ConnectStep onNextStep={() => setUserData(1)} />
      key: 'step-connect',
      title: 'Time To Protect Our Wealth ✌️',
    },
    {
      content: (
        <PlanCustomization
          stepperClassName=""
          userData={userData}
          renderStepper={() => renderStepper()}
          onPrevStep={() => {
            const updatedUserData = getUpdatedUserData();
            setUserData({ ...updatedUserData, activeStep: 0 });
          }}
          onNextStep={(
            beneficiaries: IBeneficiary[],
            expirationDays: number
          ) => {
            const updatedUserData = getUpdatedUserData();
            dispatch(
              setActiveStep({
                activeStep: 2,
              })
            );

            dispatch(setBeneficiaries(beneficiaries));
            dispatch(setExpirationDays({ expirationDays }));
            setUserData({
              ...updatedUserData,
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
          beneficiaries={userData.beneficiaries}
          onPrevStep={() => {
            const updatedUserData = getUpdatedUserData();
            setUserData({ ...updatedUserData, activeStep: 1 });
          }}
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

  return (
    <div className="mb-12">
      {renderTitle()}
      <div className="max-w-[1280px] rounded-xl bg-white px-32 py-9 drop-shadow-lg">
        {renderStep(steps)}
      </div>
    </div>
  );
};

export default Steps;
