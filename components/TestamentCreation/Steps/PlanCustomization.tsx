import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Caption from 'components/Caption/Caption';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import { isAddress } from 'ethers/lib/utils';
import { IBeneficiary, ITestamentInfo } from 'mock';
import { BaseSyntheticEvent, useState } from 'react';
import { Address } from 'utils/Types';

interface Props {
  stepperClassName?: string;
  testamentInfo: ITestamentInfo;
  renderStepper: Function;
  onNextStep: Function;
  onPrevStep: Function;
}

const PlanCustomization = ({
  stepperClassName,
  testamentInfo,
  renderStepper,
  onNextStep,
  onPrevStep,
}: Props) => {
  const defaultBeneficiary = {
    name: '',
    address: '0x' as Address,
    isClaimant: false,
    distribution: 0,
  };

  const [beneficiaries, setBeneficiaries] = useState<IBeneficiary[]>(
    testamentInfo.beneficiaries
  );

  const [expirationDays, setExpirationDays] = useState<number>(
    testamentInfo.expirationDays || 7
  );
  const [errors, setErrors] = useState<boolean[]>([false]);

  function handleExpirationChange(event: any) {
    setExpirationDays(Number(event.target.value));
  }

  function handleAddBeneficiary() {
    setBeneficiaries([...beneficiaries, defaultBeneficiary]);
  }

  function handleAddressBlur(index: number) {
    setErrors([
      ...errors.slice(0, index),
      !isAddress(beneficiaries[index].address),
      ...errors.slice(index + 1),
    ]);
  }

  function handleChange(key: string, value: string, index: number) {
    setBeneficiaries([
      ...beneficiaries.slice(0, index),
      {
        ...beneficiaries[index],
        [key]: value,
      },
      ...beneficiaries.slice(index + 1),
    ]);
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
    onNextStep(beneficiaries, expirationDays);
  }

  function handleCloseIconClick(index: number) {
    setBeneficiaries([
      ...beneficiaries.slice(0, index),
      ...beneficiaries.slice(index + 1),
    ]);

    setErrors([...errors.slice(0, index), ...errors.slice(index + 1)]);
  }

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
  }

  function renderRow(beneficiary: IBeneficiary, index: number) {
    return (
      <div className="flex flex-col justify-between py-4 lg:flex-row">
        <section className="my-3 flex flex-col lg:my-0  lg:flex-row xl:w-3/12">
          <label className="pb-3 font-bold lg:hidden">Name</label>
          <input
            type="text"
            className=" rounded text-pink-500 lg:w-3/4 xl:w-full"
            placeholder="Beneficiary name"
            required
            onChange={(event: BaseSyntheticEvent) => {
              handleChange('name', event.target.value, index);
            }}
            value={beneficiary.name}
          />
        </section>
        <section className="my-3 flex flex-col lg:my-0  lg:flex-row xl:w-4/12">
          <label className="pb-3 font-bold lg:hidden">Wallet</label>
          <input
            type="text"
            className="w-full rounded text-pink-500 lg:w-3/4 xl:w-full"
            placeholder="Beneficiary address*"
            required
            onChange={(event: BaseSyntheticEvent) => {
              handleChange('address', event.target.value, index);
            }}
            onBlur={() => handleAddressBlur(index)}
            value={beneficiary.address}
          />
        </section>
        <section className="my-3 flex flex-col lg:my-0 lg:flex lg:flex-row xl:w-2/12">
          <label className="pb-3 font-bold lg:hidden">% Distribution</label>
          <input
            type="number"
            className="rounded text-pink-500 lg:w-3/4 "
            placeholder="100%"
            required
            onChange={(event: BaseSyntheticEvent) =>
              handleChange('distribution', event.target.value, index)
            }
            value={beneficiary.distribution}
          />
        </section>
        <section className="my-3 flex flex-col lg:my-0 lg:flex-row xl:w-1/12">
          <FontAwesomeIcon
            className="ml-auto cursor-pointer"
            icon="trash"
            onClick={() => handleCloseIconClick(1)}
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
          <>{beneficiaries.map(renderRow)}</>
        </div>

        <div className="flex justify-center">
          <Button
            color="#5F4DFF"
            fontSize="14px"
            leftIcon={<AddIcon />}
            onClick={handleAddBeneficiary}
            variant="ghost"
          >
            Add another beneficiary
          </Button>
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
              value={expirationDays}
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={180}>180 days</option>
              <option value={365}>365 days</option>
            </select>

            <select className="form-select   w-2/6 rounded px-4 py-3">
              <option>Just peace</option>

              {beneficiaries.map((beneficiary, index) => {
                return (
                  <option key={`option-${index}`}>
                    Just {index + 1} beneficiary
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="my-6 flex justify-center">
          <Button
            color="#5F4DFF"
            fontSize="14px"
            marginRight="80px"
            onClick={() => onPrevStep()}
            variant="ghost"
          >
            Back
          </Button>
          <PrimaryButton
            text={'Continue'}
            className={'!py-4 !px-14'}
            onClick={handleContinueClick}
          />
        </div>
      </form>
    </div>
  );
};

export default PlanCustomization;
