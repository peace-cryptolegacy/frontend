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
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { TestamentCreationInfo } from 'utils/Types';
import { useAccount } from 'wagmi';
import useGetDynamicVault from '../../../hooks/useGetDynamicVault';
import {
  dispatchTestamentCreationInfo,
  getTestamentCreationInfo,
} from '../../../store/reducers/testamentCreationInfo';

const Steps = () => {
  // get testament info from redux state
  const dispatch = useAppDispatch();
  const testamentCreationInfo: TestamentCreationInfo = useAppSelector(
    getTestamentCreationInfo
  );

  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];

  //temp solution to redirect upon testament update
  const [canceled, setCanceled] = useState<boolean>(false);
  const [created, setCreated] = useState(false);

  // smart-contracts
  const { address } = useAccount();

  const { transact: createTestament, transaction: createTestamentTransaction } =
    useCreateTestament(
      BigNumber.from(testamentCreationInfo.expirationDays),
      // The create testament function does not take the IBeneficiary type. Check the deployments file
      testamentCreationInfo.beneficiaries?.map(
        ({ name, address, distribution }) => ({
          name,
          address_: address,
          inheritancePercentage: BigNumber.from(distribution),
        })
      )
    );

  const dynamicVault = useGetDynamicVault(address);

  useEffect(() => {
    if (!createTestamentTransaction.isSuccess) {
      return;
    }
    createTestament.reset();
    setCanceled(false);
    setCreated(true);

    const addBeneficiariesToDB = async () => {
      try {
        await axios.post('/api/testament-signatures', {
          dynamicVaultOwner: address,
          beneficiaries: testamentCreationInfo.beneficiaries.map(
            (beneficiary) => {
              return {
                address: beneficiary.address,
              };
            }
          ),
        });
      } catch (error) {
        return error;
      }
    };

    addBeneficiariesToDB();
  }, [
    address,
    createTestament,
    createTestamentTransaction,
    testamentCreationInfo.beneficiaries,
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
          activeStep={testamentCreationInfo.activeStep}
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
            dispatch(
              dispatchTestamentCreationInfo({
                ...testamentCreationInfo,
                activeStep: 1,
                selectedPlan: testamentCreationInfo.selectedPlan,
              })
            );
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
          testamentInfo={testamentCreationInfo}
          renderStepper={() => renderStepper()}
          onPrevStep={() => {
            dispatch(
              dispatchTestamentCreationInfo({
                ...testamentCreationInfo,
                activeStep: 0,
              })
            );
          }}
          onNextStep={() => {
            dispatch(
              dispatchTestamentCreationInfo({
                ...testamentCreationInfo,
                activeStep: 2,
              })
            );

            dispatch(
              dispatchTestamentCreationInfo({
                ...testamentCreationInfo,
                activeStep: 2,
              })
            );
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
          beneficiaries={testamentCreationInfo.beneficiaries}
          expirationDays={testamentCreationInfo.expirationDays}
          onPrevStep={() => {
            dispatch(
              dispatchTestamentCreationInfo({
                ...testamentCreationInfo,
                activeStep: 1,
              })
            );
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
    return (
      <Title text={steps && steps[testamentCreationInfo.activeStep].title} />
    );
  }

  function renderStep() {
    return steps[testamentCreationInfo.activeStep].content;
  }

  const renderPage = () => {
    if (!dynamicVault) {
      return <UILoading />;
    }

    if (!canceled) {
      if (
        (dynamicVault.data && dynamicVault.data.testament.status == 1) ||
        created
      ) {
        return (
          <ProtectionsActive
            dynamicVault={dynamicVault.data}
            setCanceled={setCanceled}
          />
        );
      }
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
