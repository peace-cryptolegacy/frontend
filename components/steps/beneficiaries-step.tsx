import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
} from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { BaseSyntheticEvent, useState } from 'react';
import styles from 'styles/BeneficiariesStep.module.scss';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  onNextStep: Function;
  onPrevStep: Function;
}

type Beneficiary = {
  stepperClassname?: string;
  name: string;
  address: string;
  isClaimant?: boolean;
  distribution: number;
};

const BeneficiariesStep = ({
  stepperClassName,
  renderStepper,
  onNextStep,
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
  const [expiration, setExpiration] = useState<number>(7);
  const [errors, setErrors] = useState<boolean[]>([false]);

  function handleExpirationChange(event: any) {
    setExpiration(Number(event.target.value));
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

  function handleClaimantChange(value: string, index: number) {
    const nextBeneficiaries = beneficiaries.map(
      (beneficiary, beneficiaryIndex) => {
        return {
          ...beneficiary,
          isClaimant: index === beneficiaryIndex,
        };
      }
    );

    setBeneficiaries(nextBeneficiaries);
  }

  async function handleContinueClick() {
    onNextStep(beneficiaries, expiration);
  }

  function handleCloseIconClick(index: number) {
    setBeneficiaries([
      ...beneficiaries.slice(0, index),
      ...beneficiaries.slice(index + 1),
    ]);

    setErrors([...errors.slice(0, index), ...errors.slice(index + 1)]);
  }

  function renderRow(beneficiary: Beneficiary, index: number) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        marginBottom="15px"
        key={`beneficiary-${index}`}
      >
        <FormControl flex={5}>
          <Input
            height="50px"
            onChange={(event: BaseSyntheticEvent) => {
              handleChange('name', event.target.value, index);
            }}
            placeholder="Beneficiary name"
            value={beneficiary.name}
            width="80%"
          />
        </FormControl>

        <FormControl flex={5} isInvalid={errors[index]}>
          <Input
            height="50px"
            onChange={(event: BaseSyntheticEvent) =>
              handleChange('address', event.target.value, index)
            }
            onBlur={() => handleAddressBlur(index)}
            placeholder="Beneficiary address *"
            required
            value={beneficiary.address}
            width="80%"
          />
          <FormErrorMessage>
            The address format is not correct.
          </FormErrorMessage>
        </FormControl>

        <Box
          alignContent="center"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flex={1}
        >
          <Checkbox
            isChecked={beneficiary.isClaimant}
            onChange={(event: BaseSyntheticEvent) =>
              handleClaimantChange(event.target.checked, index)
            }
          ></Checkbox>
        </Box>

        <FormControl flex={1}>
          <Input
            marginLeft={10}
            height="50px"
            onChange={(event: BaseSyntheticEvent) =>
              handleChange('distribution', event.target.value, index)
            }
            required
            value={beneficiary.distribution}
            type="number"
          />
        </FormControl>

        <Box
          alignItems="center"
          cursor="pointer"
          display="flex"
          flex={1}
          justifyContent="flex-end"
          marginRight={10}
        >
          <CloseIcon onClick={() => handleCloseIconClick(index)} />
        </Box>
      </Box>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}
      <Box className="py-6">
        <div>
          Your inheritance plan will have one or more beneficiaries, you can
          select which of them could activate the protocol after inactivity time
          passed.
        </div>
        <br />
        <div>
          You can add an identifier name to verify in the future who will be
          receiving your will and customize % of funds and the different type of
          tokens that will inherit. This plan will ONLY be claimable on
          Moonbase.
        </div>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>

      <Box color="#64748B" display="flex" flexDirection="row" fontWeight="bold">
        <Box flex={5}>Name</Box>
        <Box flex={5}>address</Box>
        <Box flex={1}>Claimant</Box>
        <Box flex={1} marginLeft={10}>
          % Distr
        </Box>
        <Box flex={1}></Box>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>

      {beneficiaries.map(renderRow)}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        marginBottom="30px"
        marginTop="30px"
      >
        <Button
          color="#5F4DFF"
          fontSize="14px"
          leftIcon={<AddIcon />}
          onClick={handleAddBeneficiary}
          variant="ghost"
        >
          Add another beneficiary
        </Button>
      </Box>

      <Box marginBottom="20px">
        Choose how many days and which beneficiaries need to sign for the funds
        to be released:
      </Box>

      <Box display="flex">
        <Box marginRight="150px">
          <Select size="lg" width="230px" onChange={handleExpirationChange}>
            <option value={30}>30 days</option>
            <option value={180}>180 days</option>
            <option value={360}>360 days</option>
          </Select>
        </Box>

        <Box>
          <Select size="lg" width="230px">
            <option>Just peace</option>

            {beneficiaries.map((beneficiary, index) => {
              return (
                <option key={`option-${index}`}>
                  Just {index + 1} beneficiary
                </option>
              );
            })}
          </Select>
        </Box>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>

      <Box display="flex" flexDirection="row" justifyContent="center">
        <Button
          color="#5F4DFF"
          fontSize="14px"
          marginRight="80px"
          onClick={() => onPrevStep()}
          variant="ghost"
        >
          Back
        </Button>

        <Button
          backgroundColor="#5F4DFF"
          color="#FFFFFF"
          onClick={handleContinueClick}
          width="180px"
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default BeneficiariesStep;
