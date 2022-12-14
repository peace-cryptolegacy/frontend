import axios from 'axios';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import ProtectionsActive from 'components/protection/active/Active';
import Stepper from 'components/Stepper/Stepper';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import Title from 'components/Title/Title';
import UILoading from 'components/UI/Loading';
import { BigNumber } from 'ethers';
import useCreateTestament from 'hooks/useCreateTestament';
import { IBeneficiary } from 'mock';
import { testamentInfoInitialValue } from 'mock/index';
import { useEffect } from 'react';
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
import { useAccount } from 'wagmi';
import useGetDynamicVault from '../../../hooks/useGetDynamicVault';

const Steps = () => {
  const dispatch = useAppDispatch();
  const beneficiaries: IBeneficiary[] = useAppSelector(getBeneficiaries);
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

  // smart-contracts

  const { address } = useAccount();

  const { transact: createTestament, transaction: createTestamentTransaction } =
    useCreateTestament(
      BigNumber.from(testamentInfo.expirationDays),
      // The create testament function does not take the IBeneficiary type. Check the deployments file
      beneficiaries?.map(({ name, address, distribution }) => ({
        name,
        address_: address,
        inheritancePercentage: BigNumber.from(distribution),
      }))
    );

  const dynamicVault = useGetDynamicVault(address);

  useEffect(() => {
    if (!createTestamentTransaction.isSuccess) {
      return;
    }
    dynamicVault.refetch();
    createTestament.reset();

    const addBeneficiariesToDB = async () => {
      try {
        await axios.post('/api/testament-signatures', {
          dynamicVaultOwner: address,
          beneficiaries: beneficiaries.map((beneficiary) => {
            return {
              address: beneficiary.address,
            };
          }),
        });
      } catch (error) {
        return error;
      }
    };

    addBeneficiariesToDB();
  }, [
    address,
    beneficiaries,
    createTestament,
    createTestamentTransaction,
    dynamicVault,
  ]);

  async function handleDeploy() {
    if (createTestament.write) {
      createTestament.write();
    } else {
      return;
    }
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
          onNextStep={{
            handleDeploy: handleDeploy,
            isCreateTestamentLoading: createTestament.isLoading,
            isCreateTestamentTransactionLoading:
              createTestamentTransaction.isLoading,
          }}
        />
      ),
      key: 'step-distribution',
      title: 'Reviewing inheritance plan',
    },
  ];

  function renderTitle() {
    return <Title text={steps && steps[testamentInfo.activeStep].title} />;
  }

  function renderStep() {
    return steps[testamentInfo.activeStep].content;
  }

  const renderPage = () => {
    if (!dynamicVault) {
      return <UILoading />;
    }

    if (
      (dynamicVault.data && dynamicVault.data.testament.status == 1) ||
      createTestamentTransaction?.isSuccess
    ) {
      return <ProtectionsActive {...dynamicVault.data} />;
    }
    return (
      <div className="my-16">
        {renderTitle()}
        <div className="w-full rounded-xl bg-white px-8 py-4 drop-shadow-lg lg:px-12 lg:py-9 xl:px-32">
          {renderStep()}
        </div>
      </div>
    );
  };

  return renderPage();
};

export default Steps;
