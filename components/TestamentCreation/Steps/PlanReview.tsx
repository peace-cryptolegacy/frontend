import { Box, Button as ChakraButton, Stack } from '@chakra-ui/react';
import Button from 'components/button/Button';
import Caption from 'components/Caption/Caption';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import { IBeneficiary } from 'mock';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  beneficiaries: IBeneficiary[];
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
          text="You’re about to create a new Testament on Moonbase and will have to
          confirm a transaction with your currently connected wallet."
          className="my-2 text-left text-black"
        ></Caption>
        <Caption
          text="After you create this Testament, you will need to approve which tokens
          you would like to distribute after the following conditions you set:"
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
            <Box marginBottom={5}>
              Any transaction requires the confirmation of:
            </Box>
            <Box color="#000000">1 out of 1 claimer</Box>
          </Box>
          <Box maxWidth={220}>
            <Box marginBottom={5}>
              Claimer will be able to distribute the funds after:
            </Box>
            <Box color="#000000">
              {expirationDays} days of inactivity on wallet
            </Box>
          </Box>
          <Box maxWidth={220}>
            <Box marginBottom={5}>
              The Testament will distribute the following % of tokens
            </Box>
            <Box color="#000000">100% of the approved tokens</Box>
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
