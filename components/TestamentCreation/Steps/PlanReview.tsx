import { Stack } from '@chakra-ui/react';
import Button from 'components/button/Button';
import Caption from 'components/Caption/Caption';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import Section from 'components/Section/Section';
import { IBeneficiary } from 'mock';
import { useAppSelector } from 'store/hooks';
import { getTestamentCreationInfo } from 'store/reducers/testamentCreationInfo';
import { formatAddress } from 'utils/formatters';
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
      <Section
        className="flex-row items-center !gap-10 text-center sm:text-left"
        key={`beneficiary-${index}`}
      >
        <div className="w-full sm:w-4/12">
          <span className="block">{beneficiary.name}</span>
          <span className="text-sm sm:hidden">
            {formatAddress(beneficiary.address)}
          </span>
        </div>
        <span className="hidden w-4/12 sm:inline">
          {formatAddress(beneficiary.address)}
        </span>
        <span className="inline w-full sm:w-2/12">
          {beneficiary.distribution}%
        </span>
        <div className="hidden sm:block sm:w-2/12">
          <Button onClick={() => onPrevStep()} variant="text">
            Edit
          </Button>
        </div>
      </Section>
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

      <HorizontalRule />

      {/* >sm screens */}
      <section className="my-5 hidden space-y-8 sm:block">
        <Section className="flex-col !gap-10 text-blue-gray sm:flex-row">
          <span className="w-full">Succession will be possible after:</span>
          <span className="w-full">Signatures required for succession:</span>
          <span className="w-full">% of tokens released upon succession:</span>
        </Section>
        <Section className="!gap-10">
          <span className="w-full">{expirationDays} days of inactivity</span>
          <span className="w-full">
            {testamentCreationInfo.signaturesRequired} out of{' '}
            {beneficiaries.length} beneficiaries
            {testamentCreationInfo.signaturesRequired === 0 &&
              ". It's automatic."}
          </span>
          <span className="w-full">100% of approved tokens</span>
        </Section>
      </section>

      {/* <sm screens */}
      <section className="my-5 space-y-8 sm:hidden">
        <Section className="flex-col items-center !gap-10 text-center sm:flex-row sm:text-blue-gray [&>div]:!space-y-4">
          <div>
            <span className="block text-blue-gray">
              Succession will be possible after:
            </span>
            <span className="block">{expirationDays} days of inactivity</span>
          </div>
          <div>
            <span className="block text-blue-gray">
              Signatures required for succession:
            </span>
            <span className="block">
              {testamentCreationInfo.signaturesRequired} out of{' '}
              {beneficiaries.length} beneficiaries
              {testamentCreationInfo.signaturesRequired === 0 &&
                ". It's automatic."}
            </span>
          </div>
          <div>
            <span className="block text-blue-gray">
              % of tokens released upon succession:
            </span>
            <span className="block">100% of approved tokens</span>
          </div>
        </Section>
      </section>

      <HorizontalRule className="mb-5" />

      <Section className="h4 mb-6 flex !gap-10 text-center sm:text-left">
        <span className="w-full sm:w-4/12">Beneficiary</span>
        <span className="hidden w-4/12 sm:inline">Wallet</span>
        <span className="w-full sm:w-2/12">Funds</span>
        <span className="hidden w-2/12 sm:inline"></span>
      </Section>

      <div className="space-y-6">{beneficiaries.map(renderRow)}</div>

      <Stack
        direction="row"
        className="mt-20 items-center justify-center gap-6 mobile-lg:gap-10"
      >
        <Button color="#5F4DFF" onClick={() => onPrevStep()} variant="text">
          Back
        </Button>

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
