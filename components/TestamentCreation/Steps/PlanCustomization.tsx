import { AddIcon } from '@chakra-ui/icons';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Button from 'components/button/Button';
import Caption from 'components/Caption/Caption';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import { isAddress } from 'ethers/lib/utils';
import { IBeneficiary, ITestamentInfo } from 'mock';
import { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { dispatchTestamentCreationInfo } from 'store/reducers/testamentCreationInfo';
import { DeepPartial } from 'utils/Types';
import { getTestamentCreationInfo } from '../../../store/reducers/testamentCreationInfo';

interface Props {
  stepperClassName?: string;
  testamentInfo: DeepPartial<ITestamentInfo>;
  renderStepper: Function;
  onNextStep: Function;
  onPrevStep: Function;
}

const PlanCustomization = ({
  stepperClassName,
  renderStepper,
  onNextStep,
  onPrevStep,
}: Props) => {
  const dispatch = useDispatch();

  const testamentCreationInfo = useAppSelector(getTestamentCreationInfo);

  const [errors, setErrors] = useState<boolean[]>([false]);

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

  function handleAddressBlur(index: number) {
    setErrors([
      ...errors.slice(0, index),
      !isAddress(testamentCreationInfo.beneficiaries[index]?.address || ''),
      ...errors.slice(index + 1),
    ]);
  }

  function handleChange(key: string, value: string, index: number) {
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

  // function handleClaimantChange(value: string, index: number) {
  //   const nextBeneficiaries = beneficiaries.map(
  //     (beneficiary, beneficiaryIndex) => {
  //       return {
  //         ...beneficiary,
  //         isClaimant: index === beneficiaryIndex,
  //       };
  //     }
  //   );

  //   setBeneficiaries(nextBeneficiaries);
  // }

  async function handleContinueClick() {
    onNextStep();
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

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
    handleContinueClick();
  }

  function renderRow(
    beneficiary: DeepPartial<IBeneficiary> | undefined,
    index: number
  ) {
    return (
      <div className="flex flex-col justify-between py-4 lg:flex-row">
        <section className="mb-2 flex flex-col lg:mb-0  lg:flex-row xl:w-3/12">
          <label className="pb-3 font-bold lg:hidden">Name</label>
          <input
            type="text"
            className=" rounded text-pink-500 lg:w-3/4 xl:w-full"
            placeholder="Beneficiary name"
            required
            onChange={(event: BaseSyntheticEvent) => {
              handleChange('name', event.target.value, index);
            }}
            value={beneficiary?.name}
          />
        </section>
        <section className="mb-2 flex flex-col lg:mb-0  lg:flex-row xl:w-4/12">
          <label className="pb-3 font-bold lg:hidden">Wallet</label>
          <input
            type="text"
            className="w-full rounded text-pink-500 lg:w-3/4 xl:w-full"
            placeholder="0x"
            required
            onChange={(event: BaseSyntheticEvent) => {
              handleChange('address', event.target.value, index);
            }}
            onBlur={() => handleAddressBlur(index)}
            value={beneficiary?.address}
          />
        </section>
        <section className="mb-2 flex flex-col lg:mb-0 lg:flex lg:flex-row xl:w-2/12">
          <label className="pb-3 font-bold lg:hidden">% Distribution</label>
          <input
            type="number"
            className="rounded text-pink-500 lg:w-3/4 "
            placeholder="0"
            required
            onChange={(event: BaseSyntheticEvent) =>
              handleChange('distribution', event.target.value, index)
            }
            value={beneficiary?.distribution}
          />
        </section>
        <section
          className={clsx(
            index === 0 && 'text-transparent',
            'mb-2 flex flex-col items-center lg:mb-0 lg:flex-row xl:w-1/12'
          )}
        >
          <FontAwesomeIcon
            className={clsx(
              index === 0 ? 'cursor-auto' : 'cursor-pointer',
              'ml-auto'
            )}
            icon="trash"
            onClick={() => (index === 0 ? null : handleCloseIconClick(index))}
          />
        </section>
      </div>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}

      <div className="my-6 flex flex-col sm:block lg:hidden">
        <Caption
          text="Select which wallets could activate the protocol after inactivity time passed. This plan will ONLY be claimable on:                           "
          className="my-3 text-left text-black"
        ></Caption>
      </div>

      <div className="my-6  hidden flex-col lg:flex">
        <Caption
          text="Your inheritance plan will have one or more beneficiaries, you can
          select which of them could activate the protocol after inactivity time
          passed."
          className="my-3 text-left text-black"
        ></Caption>
        <Caption
          text="You can add an identifier name to verify in the future who will be
          receiving your will and customize % of funds and the different type of
          tokens that will inherit. This plan will ONLY be claimable on
          Moonbase."
          className="my-3 text-left text-black"
        ></Caption>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className=" hidden justify-between lg:flex">
            <label className="pb-3 font-bold xl:w-3/12">Name</label>
            <label className="pb-3 font-bold xl:w-4/12">Wallet</label>
            <label className="pb-3 font-bold xl:w-2/12">% Distribution</label>
            <label className="pb-3 font-bold xl:w-1/12"></label>
          </div>
          <HorizontalRule className="hidden w-full border-[1px] lg:block" />
          {testamentCreationInfo.beneficiaries.map((beneficiary, index) =>
            renderRow(beneficiary, index)
          )}
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
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
            <select
              className="form-select w-2/6 rounded px-4 py-3"
              onChange={handleExpirationChange}
              value={testamentCreationInfo.expirationDays}
            >
              <option value={30}>30 days</option>
              <option value={180}>180 days</option>
              <option value={360}>360 days</option>
            </select>

            <select
              className="form-select   w-2/6 rounded px-4 py-3"
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

        <div className="my-6 flex justify-center">
          <ChakraButton
            color="#5F4DFF"
            fontSize="14px"
            marginRight="80px"
            onClick={() => onPrevStep()}
            variant="ghost"
          >
            Back
          </ChakraButton>
          <Button
            variant={'primary'}
            className={'!py-2 !px-10 lg:!py-4 lg:!px-14'}
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
