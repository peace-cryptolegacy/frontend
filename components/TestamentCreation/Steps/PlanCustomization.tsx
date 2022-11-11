import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Caption from 'components/Caption/Caption';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
// import { isAddress } from 'ethers/lib/utils';
import { useState } from 'react';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  onNextStep: Function;
  onPrevStep: Function;
}

type Beneficiary = {
  stepperClassname?: string;
  name?: string;
  address: string;
  isClaimant?: boolean;
  distribution: number;
};

const PlanCustomization = ({
  stepperClassName,
  renderStepper,
  // onNextStep,
  onPrevStep,
}: Props) => {
  const defaultBeneficiary = {
    name: '',
    address: '',
    isClaimant: false,
    distribution: 0,
  };
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    defaultBeneficiary,
  ]);
  // const [expiration, setExpiration] = useState<number>(7);
  const [errors, setErrors] = useState<boolean[]>([false]);

  // function handleExpirationChange(event: any) {
  //   setExpiration(Number(event.target.value));
  // }

  function handleAddBeneficiary() {
    setBeneficiaries([...beneficiaries, defaultBeneficiary]);
  }

  // function handleAddressBlur(index: number) {
  //   setErrors([
  //     ...errors.slice(0, index),
  //     !isAddress(beneficiaries[index].address),
  //     ...errors.slice(index + 1),
  //   ]);
  // }

  // function handleChange(key: string, value: string, index: number) {
  //   setBeneficiaries([
  //     ...beneficiaries.slice(0, index),
  //     {
  //       ...beneficiaries[index],
  //       [key]: value,
  //     },
  //     ...beneficiaries.slice(index + 1),
  //   ]);
  // }

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
    // onNextStep(beneficiaries, expiration);
  }

  function handleCloseIconClick(index: number) {
    setBeneficiaries([
      ...beneficiaries.slice(0, index),
      ...beneficiaries.slice(index + 1),
    ]);

    setErrors([...errors.slice(0, index), ...errors.slice(index + 1)]);
  }

  function renderRow() {
    return (
      <tr className="">
        <td className="text-left">
          <input
            type="text"
            className="w-11/12 rounded text-pink-500"
            placeholder="Beneficiary name"
            required
          />
        </td>
        <td className="text-left">
          <input
            type="text"
            className="w-11/12 rounded text-pink-500"
            placeholder="Beneficiary name"
            required
          />
        </td>
        <td className="text-left">
          <input type="checkbox" className="rounded text-purple-600" />
        </td>
        <td className="text-left">
          <input
            type="number"
            className="w-6/12 rounded text-pink-500"
            placeholder="100%"
            required
          />
        </td>
        <td>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon="trash"
            onClick={() => handleCloseIconClick(1)}
          />
        </td>
      </tr>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}
      <div className="my-6 flex flex-col">
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

      <table className="my-6 w-full table-fixed text-left">
        <thead>
          <tr className="">
            <th>Name</th>
            <th>Address</th>
            <th className="w-1/12">Claimant</th>
            <th className="w-2/12">% Distr</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>{beneficiaries.map(renderRow)}</tbody>
      </table>

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
        <div className="flex justify-between">
          <select className="form-select w-2/6 rounded px-4 py-3">
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
    </div>
  );
};

export default PlanCustomization;