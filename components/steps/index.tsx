// @ts-nocheck

import { writeTestament } from 'utils/web3/heritage';
import { useState } from 'react';
import BeneficiariesStep from 'components/steps/beneficiaries-step';
import classNames from 'classnames';
import ConnectStep from 'components/steps/connect-step';
import ReviewStep from 'components/steps/review-step';
import styles from 'styles/Steps.module.scss';

const CreatePlan = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [beneficiaries, setBeneficiares] = useState({});
  const steps = [
    {
      content: <ConnectStep onNextStep={() => setActiveStep(1)} />,
      key: 'step-connect',
      title: 'Connect wallet & select network',
    },
    {
      content: (
        <BeneficiariesStep
          onPrevStep={() => setActiveStep(0)}
          onNextStep={(beneficiaries: any, expiration: any) => {
            setActiveStep(2);
            setBeneficiares({
              beneficiaries,
              expiration,
            });
          }}
        />
      ),
      key: 'step-beneficiaries',
      title: 'Select beneficiaries & proof of life',
    },
    {
      content: (
        <ReviewStep
          beneficiaries={beneficiaries}
          onPrevStep={() => setActiveStep(1)}
          onNextStep={() => handleDeploy()}
        />
      ),
      key: 'step-distribution',
      title: 'Review your testament',
    },
  ];

  async function handleDeploy() {
    await writeTestament(beneficiaries.beneficiaries, beneficiaries.expiration);

    window.location.reload();
  }

  function renderStep(
    { content, key, title }: { content: any; key: string; title: string },
    index: number
  ) {
    return (
      <div className={classNames(styles['steps__step'])} key={key}>
        <div className={styles['steps__step__stepper']}>
          <div className={styles['steps__step__stepper__header']}>
            <div className={styles['steps__step__stepper__circle']}>
              {index + 1}
            </div>
            <div className={styles['steps__step__stepper__title']}>{title}</div>
          </div>
          <div className={styles['steps__step__stepper__line']}></div>
        </div>

        <div className={styles['steps__step__content']}>
          {index === activeStep ? content : null}
        </div>
      </div>
    );
  }

  return <div className={styles['steps']}>{steps.map(renderStep)}</div>;
};

export default CreatePlan;
