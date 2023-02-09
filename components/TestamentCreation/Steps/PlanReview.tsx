import { Box, Button as ChakraButton, Stack } from '@chakra-ui/react';
import Button from 'components/button/Button';
import Caption from 'components/Caption/Caption';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import { IBeneficiary } from 'mock';
import { useAppSelector } from 'store/hooks';
import { getTestamentCreationInfo } from 'store/reducers/testamentCreationInfo';
import { DeepPartial } from 'utils/Types';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  beneficiaries: DeepPartial<IBeneficiary[]>;
  expirationDays: number;
  onNextStep: {
    handleDeploy: Function;
    isCreateTestamentLoading: boolean;
    isCreateTestamentTransactionLoading: boolean;
  };
  onPrevStep: Function;
}

const PlanReview = ({
  stepperClassName,
  renderStepper,
  beneficiaries,
  expirationDays,
  onNextStep,
  onPrevStep,
}: Props) => {
  const testamentCreationInfo = useAppSelector(getTestamentCreationInfo);

  function renderRow(beneficiary: any, index: any) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        marginBottom="15px"
        key={`beneficiary-${index}`}
      >
        <Box flex={3}>{beneficiary.name}</Box>
        <Box flex={1}>{beneficiary.distribution} %</Box>
        <Box className="hidden lg:block" flex={3}>
          {beneficiary.address}
        </Box>
        <Box
          className="cursor-pointer text-purple-900"
          onClick={() => onPrevStep()}
          flex={1}
        >
          Edit
        </Box>
      </Box>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}

      <div className="flex flex-col py-2">
        <Caption
          text="You’re about to create a new Testament on the Mumbai network. Please review the details below are correct. Then click 'Create' and confirm the transaction in your wallet."
          className="my-2 text-left text-black"
        ></Caption>
        <Caption
          text="Once your testament is created, you will able to add the tokens you want to be inherited."
          className="my-2 text-left text-black"
        ></Caption>
      </div>

      <HorizontalRule className="mb-5 hidden w-full border-[1px] lg:block" />
      <div className="hidden lg:block">
        <Box
          color="#64748B"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={10}
        >
          <Box maxWidth={220}>
            <Box marginBottom={5}>Succession will be possible after:</Box>
            <Box color="#000000">{expirationDays} days of inactivity</Box>
          </Box>
          <Box maxWidth={220}>
            <Box marginBottom={5}>
              The succession requires the confirmation of:
            </Box>
            <Box color="#000000">
              {testamentCreationInfo.signaturesRequired} out of{' '}
              {beneficiaries.length}{' '}
              {beneficiaries.length === 1 ? 'beneficiary' : 'beneficiaries'}
              {testamentCreationInfo.signaturesRequired === 0 &&
                ". It's automatic"}
            </Box>
          </Box>
          <Box maxWidth={220}>
            <Box marginBottom={5}>
              % of tokens to be released upon succession:
            </Box>
            <Box color="#000000">100% of approved tokens</Box>
          </Box>
        </Box>
      </div>

      <HorizontalRule className="mb-5 hidden w-full border-[1px] lg:block" />

      <Box
        color="#64748B"
        display="flex"
        flexDirection="row"
        fontWeight="bold"
        className="mb-5"
      >
        {/* <Box flex={1}>Claimer</Box> */}
        <Box flex={3}>Beneficiary</Box>
        <Box flex={1}>% Funds</Box>
        <Box className="hidden lg:block" flex={3}>
          Wallet
        </Box>
        <Box flex={1}>Edit</Box>
      </Box>

      {beneficiaries.map(renderRow)}

      <Stack direction="row" className="mt-20 items-center justify-center">
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
          variant="primary"
          loading={
            onNextStep.isCreateTestamentTransactionLoading ||
            onNextStep.isCreateTestamentLoading
          }
          size="sm"
          onClick={() =>
            onNextStep.isCreateTestamentLoading ||
            onNextStep.isCreateTestamentTransactionLoading
              ? null
              : onNextStep.handleDeploy()
          }
        >
          Create
        </Button>
      </Stack>
    </div>
  );
};

export default PlanReview;
