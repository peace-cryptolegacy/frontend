import { AddIcon } from '@chakra-ui/icons';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Button from 'components/button/Button';
import Caption from 'components/Caption/Caption';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import Section from 'components/Section/Section';
import { isAddress } from 'ethers/lib/utils.js';
import { IBeneficiary, ITestamentInfo } from 'mock';
import { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { dispatchTestamentCreationInfo } from 'store/reducers/testamentCreationInfo';
import { DeepPartial } from 'utils/Types';
import { useAccount } from 'wagmi';
import { getTestamentCreationInfo } from '../../../store/reducers/testamentCreationInfo';

interface Props {
  stepperClassName?: string;
  testamentInfo: DeepPartial<ITestamentInfo>;
  renderStepper: Function;
  onNextStep: Function;
  onPrevStep: Function;
}

type InputErrors = {
  invalidName: boolean;
  repeatedName: boolean;
  invalidAddressFormat: boolean;
  beneficiarySameAsTestator: boolean;
  repeatedAddress: boolean;
  exceededDistributionRate: boolean;
  distributionRateZero: boolean;
};

const PlanCustomization = ({
  stepperClassName,
  renderStepper,
  onNextStep,
  onPrevStep,
}: Props) => {
  const dispatch = useDispatch();
  const testamentCreationInfo = useAppSelector(getTestamentCreationInfo);
  const { address } = useAccount();

  const inputErrorMessages = {
    invalidName: 'The name must be longer than 3 characters.',
    repeatedName: 'The name cannot be repeated.',
    invalidAddressFormat:
      'Invalid address. The address should start with 0x and be 42 characters long.',
    beneficiarySameAsTestator:
      'The beneficiary cannot be the same as the testator.',
    repeatedAddress: 'The address cannot be repeated.',
    exceededDistributionRate: 'The distribution rate cannot exceed 100%.',
    distributionRateZero: 'The distribution rate cannot be zero.',
  };

  const defaultError = {
    invalidName: false,
    repeatedName: false,
    invalidAddressFormat: false,
    repeatedAddress: false,
    beneficiarySameAsTestator: false,
    exceededDistributionRate: false,
    distributionRateZero: false,
  };

  const [errors, setErrors] = useState<InputErrors[]>(
    testamentCreationInfo.beneficiaries.map(() => {
      return defaultError;
    })
  );

  function handleExpirationChange(event: any) {
    dispatch(
      dispatchTestamentCreationInfo({
        ...testamentCreationInfo,
        expirationDays: Number(event.target.value),
      })
    );
  }

  function handleSignaturesRequiredChange(event: any) {
    dispatch(
      dispatchTestamentCreationInfo({
        ...testamentCreationInfo,
        signaturesRequired: Number(event.target.value),
      })
    );
  }

  function handleAddBeneficiary() {
    errors.push(defaultError);
    dispatch(
      dispatchTestamentCreationInfo({
        ...testamentCreationInfo,
        beneficiaries: [
          ...testamentCreationInfo.beneficiaries,
          {
            name: undefined,
            address: undefined,
            isClaimant: false,
            distribution: undefined,
          },
        ],
      })
    );
  }

  // This function does not check for the correct types of beneficiary.
  function handleChange(
    key: 'name' | 'address' | 'distribution',
    value: string | number | undefined,
    index: number
  ) {
    dispatch(
      dispatchTestamentCreationInfo({
        ...testamentCreationInfo,
        beneficiaries: [
          ...testamentCreationInfo.beneficiaries.slice(0, index),
          {
            ...testamentCreationInfo.beneficiaries[index],
            [key]: value,
          },
          ...testamentCreationInfo.beneficiaries.slice(index + 1),
        ],
      })
    );
  }

  function handleCloseIconClick(index: number) {
    dispatch(
      dispatchTestamentCreationInfo({
        ...testamentCreationInfo,
        beneficiaries: [
          ...testamentCreationInfo.beneficiaries.slice(0, index),
          ...testamentCreationInfo.beneficiaries.slice(index + 1),
        ],
      })
    );

    setErrors([...errors.slice(0, index), ...errors.slice(index + 1)]);
  }

  function checkValidName(
    beneficiary: Partial<IBeneficiary> | undefined,
    index: number
  ) {
    let validName = true;
    if ((beneficiary?.name?.length ?? 0) >= 3) {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        { ...previousErrors[index], invalidName: false },
        ...previousErrors.slice(index + 1),
      ]);
    } else {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        { ...previousErrors[index], invalidName: true },
        ...previousErrors.slice(index + 1),
      ]);
      validName = false;
    }
    testamentCreationInfo.beneficiaries.forEach((anotherBeneficiary, i) => {
      if (anotherBeneficiary?.name === beneficiary?.name && i !== index) {
        setErrors((previousErrors) => [
          ...previousErrors.slice(0, index),
          { ...previousErrors[index], repeatedName: true },
          ...previousErrors.slice(index + 1),
        ]);
        validName = false;
      } else {
        setErrors((previousErrors) => [
          ...previousErrors.slice(0, index),
          { ...previousErrors[index], repeatedName: false },
          ...previousErrors.slice(index + 1),
        ]);
      }
    });
    return validName;
  }

  function checkValidAddress(
    beneficiary: Partial<IBeneficiary> | undefined,
    index: number
  ) {
    let validAddress = true;
    if (isAddress(beneficiary?.address || '')) {
      if (beneficiary?.address === address) {
        setErrors((previousErrors) => [
          ...previousErrors.slice(0, index),
          {
            ...previousErrors[index],
            beneficiarySameAsTestator: true,
            invalidAddress: false,
            repeatedAddress: false,
          },
          ...previousErrors.slice(index + 1),
        ]);
        validAddress = false;
      } else {
        testamentCreationInfo.beneficiaries.forEach((anotherBeneficiary, i) => {
          if (
            anotherBeneficiary?.address === beneficiary?.address &&
            i !== index
          ) {
            setErrors((previousErrors) => [
              ...previousErrors.slice(0, index),
              {
                ...previousErrors[index],
                repeatedAddress: true,
                invalidAddressFormat: false,
                beneficiarySameAsTestator: false,
              },
              ...previousErrors.slice(index + 1),
            ]);
            validAddress = false;
          } else {
            setErrors((previousErrors) => [
              ...previousErrors.slice(0, index),
              {
                ...previousErrors[index],
                repeatedAddress: false,
                invalidAddressFormat: false,
                beneficiarySameAsTestator: false,
              },
              ...previousErrors.slice(index + 1),
            ]);
          }
        });
      }
    } else {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        { ...previousErrors[index], invalidAddressFormat: true },
        ...previousErrors.slice(index + 1),
      ]);
      validAddress = false;
    }
    return validAddress;
  }

  //function check valid distribution rate
  function checkValidDistributionRate(
    beneficiary: Partial<IBeneficiary> | undefined,
    index: number
  ) {
    let validDistributionRate = true;
    if (beneficiary?.distribution === 0) {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        { ...previousErrors[index], distributionRateZero: true },
        ...previousErrors.slice(index + 1),
      ]);
      validDistributionRate = false;
    } else {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        { ...previousErrors[index], distributionRateZero: false },
        ...previousErrors.slice(index + 1),
      ]);
    }

    let distributionRateSum = 0;
    testamentCreationInfo.beneficiaries.forEach((beneficiary) => {
      distributionRateSum += beneficiary?.distribution || 0;
    });
    if (distributionRateSum > 100) {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        {
          ...previousErrors[index],
          exceededDistributionRate: true,
        },
        ...previousErrors.slice(index + 1),
      ]);
      validDistributionRate = false;
    } else {
      setErrors((previousErrors) => [
        ...previousErrors.slice(0, index),
        {
          ...previousErrors[index],
          exceededDistributionRate: false,
        },
        ...previousErrors.slice(index + 1),
      ]);
    }
    return validDistributionRate;
  }

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
    let validNames = true;
    let validAddresses = true;
    let validDistributionRates = true;
    await Promise.all(
      testamentCreationInfo.beneficiaries.map((beneficiary, index) => {
        if (!checkValidName(beneficiary, index)) {
          validNames = false;
        }
        if (!checkValidAddress(beneficiary, index)) {
          validAddresses = false;
        }
        if (!checkValidDistributionRate(beneficiary, index)) {
          validDistributionRates = false;
        }
      })
    );
    if (validNames && validAddresses && validDistributionRates) {
      onNextStep();
    }
  }

  function renderRow(
    beneficiary: DeepPartial<IBeneficiary> | undefined,
    index: number
  ) {
    return (
      <section>
        <Section className="flex-col justify-between gap-6 py-4 sm:flex-row">
          <section className="mb-2 flex w-full flex-col lg:mb-0 lg:flex-row">
            <label className="block pb-3 font-bold sm:hidden">Name</label>
            <input
              type="text"
              className="block w-full rounded text-pink-500"
              placeholder="Beneficiary name"
              required
              onChange={(event: BaseSyntheticEvent) => {
                handleChange('name', event.target.value, index);
              }}
              value={beneficiary?.name}
            />
          </section>
          <section className="mb-2 flex w-full flex-col  lg:mb-0 lg:flex-row">
            <label className="block pb-3 font-bold sm:hidden">Wallet</label>
            <input
              type="text"
              className="w-full rounded text-pink-500"
              placeholder="0x..."
              required
              onChange={(event: BaseSyntheticEvent) => {
                handleChange('address', event.target.value, index);
              }}
              value={beneficiary?.address}
            />
          </section>
          <section className="mb-2 flex w-full flex-col lg:mb-0 lg:flex lg:flex-row">
            <label className="block pb-3 font-bold sm:hidden">
              % Distribution
            </label>
            <input
              type="number"
              className="w-full rounded text-pink-500"
              placeholder="1"
              min="1"
              required
              onChange={(event: BaseSyntheticEvent) =>
                handleChange(
                  'distribution',
                  event.target.value ? +event.target.value : event.target.value,
                  index
                )
              }
              value={beneficiary?.distribution}
            />
          </section>
          <section
            className={clsx(
              index === 0 && 'hidden sm:inline sm:text-transparent',
              'mb-2 flex w-full flex-col items-center justify-center sm:w-2/12 lg:mb-0 lg:flex-row'
            )}
          >
            <FontAwesomeIcon
              className={clsx(
                index === 0 ? 'cursor-auto' : 'cursor-pointer',
                'mx-auto sm:ml-auto'
              )}
              icon="trash"
              onClick={() => (index === 0 ? null : handleCloseIconClick(index))}
            />
          </section>
        </Section>
        <ul className="text-red-600">
          {Object.keys(errors[index]).map((error, i) => {
            if (errors[index][error as keyof typeof inputErrorMessages]) {
              return (
                <li key={i} className="list-disc">
                  {inputErrorMessages[error as keyof typeof inputErrorMessages]}
                </li>
              );
            }
          })}
        </ul>
      </section>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}
      <div className="my-9 flex-col lg:flex">
        <Caption className="whitespace-pre-line text-left text-black">
          To create your will, please list the details of your beneficiaries.
          After the specified period of time, they will be able to claim what
          you left them.
          {'\n'}
          {'\n'}
          The will is only valid on the Mumbai network.
        </Caption>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className="hidden justify-between sm:flex">
            <label className="w-full pb-3 font-bold">Name</label>
            <label className="w-full pb-3 font-bold">Wallet</label>
            <label className="w-full pb-3 font-bold">% Distribution</label>
            <label className="w-2/12 pb-3 font-bold"></label>
          </div>
          <HorizontalRule className="w-full border-[1px]" />
          <div className="space-y-6 sm:space-y-0">
            {testamentCreationInfo.beneficiaries.map((beneficiary, index) =>
              renderRow(beneficiary, index)
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <ChakraButton
            color="#5F4DFF"
            fontSize="14px"
            leftIcon={<AddIcon />}
            onClick={handleAddBeneficiary}
            variant="ghost"
          >
            Add another beneficiary
          </ChakraButton>
        </div>

        <div className="my-6 flex flex-col ">
          <Caption
            text="Choose how many days and which beneficiaries need to sign for the funds
          to be released:"
            className="my-3 text-left text-black"
          ></Caption>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
            <select
              className="form-select w-full rounded px-4 py-3 sm:w-2/6"
              onChange={handleExpirationChange}
              value={testamentCreationInfo.expirationDays}
            >
              <option value={30}>30 days</option>
              <option value={180}>180 days</option>
              <option value={360}>360 days</option>
            </select>

            <select
              className="form-select w-full rounded px-4 py-3 sm:w-2/6"
              onChange={handleSignaturesRequiredChange}
              value={testamentCreationInfo.signaturesRequired}
            >
              {testamentCreationInfo.beneficiaries.map((_, index) => {
                return (
                  <option key={`option-${index}`} value={index + 1}>
                    {index + 1} beneficiary
                  </option>
                );
              })}
              <option value={0}>Automatic</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 mobile-lg:gap-10">
          <Button color="#5F4DFF" onClick={() => onPrevStep()} variant="text">
            Back
          </Button>
          <Button
            variant={'primary'}
            className={'!py-2 !px-3 mobile-lg:!px-10 lg:!py-4 lg:!px-14'}
            type="submit"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanCustomization;
