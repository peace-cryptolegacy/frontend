import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import ProtectionsActive from 'components/protection/active/Active';
import Stepper from 'components/Stepper/Stepper';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import Title from 'components/Title/Title';
import { BigNumber, ethers } from 'ethers';
import useCreateTestament from 'hooks/useCreateTestament';
import { IBeneficiary } from 'mock';
import { testamentInfoInitialValue } from 'mock/index';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getBeneficiaries,
  setActiveStep,
  setBeneficiaries,
  setBeneficiariesAffected,
  setExpirationDays,
  setSelectedPlan,
} from 'store/reducers/testamentInfo';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useGetDynamicVault from '../../../hooks/useGetDynamicVault';

const Steps = () => {
  const dispatch = useAppDispatch();
  const beneficiaries: IBeneficiary[] = useAppSelector(getBeneficiaries);
  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];
  const { item: testamentInfo, saveItem: setTestamentInfo } = useLocalStorage(
    'TESTAMENT_INFO',
    testamentInfoInitialValue
  );

  const [loading, setLoading] = useState(true);
  const [dynamicVault, setDynamicVault] =
    useState<Awaited<ReturnType<typeof getDynamicVault>>>();

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

  // smart-contracts

  const { address } = useAccount();

  const { transact: createTestament } = useCreateTestament(
    beneficiaries?.filter((beneficiary) => beneficiary.isClaimant === true)[0]
      ?.address,
    BigNumber.from(testamentInfo.expirationDays),
    // The create testament function does not take the IBeneficiary type. Check the deployments file
    beneficiaries?.map(({ name, address, distribution }) => ({
      name,
      address_: address,
      inheritancePercentage: BigNumber.from(distribution),
    }))
  );

  const { isSuccess: isCreateTestamentSuccess } = useWaitForTransaction({
    hash: createTestament.data?.hash,
  });

  const getDynamicVault = useGetDynamicVault();

  const getDynamicVaultAsync = useCallback(async () => {
    const dynamicVault = await getDynamicVault?.(address);
    setDynamicVault(dynamicVault);
    setLoading(false);
  }, [address, getDynamicVault]);

  useEffect(() => {
    getDynamicVaultAsync();
  }, [getDynamicVaultAsync]);

  async function handleDeploy() {
    createTestament.write?.();
  }
  // end smart-contracts

  function renderStepper() {
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
  }
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

  const renderPage = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (
      (dynamicVault &&
        dynamicVault?.testament.claimant !== ethers.constants.AddressZero) ||
      isCreateTestamentSuccess
    ) {
      return <ProtectionsActive {...dynamicVault} />;
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

  return renderPage();
};

export default Steps;
