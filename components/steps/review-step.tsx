import { Box, Button } from '@chakra-ui/react';
import styles from 'styles/BeneficiariesStep.module.scss';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  beneficiaries: any;
  onNextStep: Function;
  onPrevStep: Function;
}

const ReviewStep = ({
  stepperClassName,
  renderStepper,
  beneficiaries,
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
        <Box flex={1}>{beneficiary.isClaimant ? 'Yes' : 'No'}</Box>
        <Box flex={3}>{beneficiary.name}</Box>
        <Box flex={1}>{beneficiary.distribution} %</Box>
        <Box flex={3}>{beneficiary.address}</Box>
      </Box>
    );
  }

  return (
    <div className={`${stepperClassName || ''}`}>
      {renderStepper()}
      <Box className="py-6">
        <div>
          You’re about to create a new Testament on Moonbase and will have to
          confirm a transaction with your currently connected wallet.
        </div>
        <br />
        <div>
          After you create this Testament, you will need to approve which tokens
          you would like to distribute after the following conditions you set:
        </div>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>
      <Box color="#000000" marginBottom={5}>
        Details
      </Box>

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
            {beneficiaries.expiration} days of inactivity on wallet
          </Box>
        </Box>
        <Box maxWidth={220}>
          <Box marginBottom={5}>
            The Testament will distribute the following % of tokens
          </Box>
          <Box color="#000000">100% of the approved tokens</Box>
        </Box>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>

      <Box marginBottom={5}>
        {beneficiaries.beneficiaries.length} Beneficiaries
      </Box>

      <Box color="#64748B" display="flex" flexDirection="row" fontWeight="bold">
        <Box flex={1}>Claimer</Box>
        <Box flex={3}>Beneficiary</Box>
        <Box flex={1}>% Funds</Box>
        <Box flex={3}>Wallet</Box>
      </Box>

      <div className={styles['beneficiariesstep__divider']}></div>

      {beneficiaries.beneficiaries.map(renderRow)}

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
          onClick={() => onNextStep()}
          width="180px"
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default ReviewStep;
