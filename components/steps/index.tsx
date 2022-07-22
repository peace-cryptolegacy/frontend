import { useState } from 'react';
import classNames from 'classnames';
import ConnectStep from 'components/steps/connect-step';
import styles from 'styles/Steps.module.scss';

const CreatePlan = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    {
      content: <ConnectStep onNextStep={setActiveStep} />,
      title: 'Connect wallet & select network',
    },
    {
      content: <div>Step 2</div>,
      title: 'Select beneficiaries & proof of life',
    },
    {
      content: <div>Step 3</div>,
      title: 'Approve tokens  & distribution',
    },
    {
      content: <div>Step 4</div>,
      title: 'Review',
    }
  ];

  function renderStep({ content, title }: { content: any, title: string  }, index: number) {
    return (
      <div className={classNames(styles['steps__step'])}>
        <div className={styles['steps__step__stepper']}>
        <div className={styles['steps__step__stepper__header']}>
            <div className={styles['steps__step__stepper__circle']}>
              { index + 1 }
            </div>
            <div className={styles['steps__step__stepper__title']}>
              { title }
            </div>
          </div>
          <div className={styles['steps__step__stepper__line']}></div>
        </div>

        <div className={styles['steps__step__content']}>
          { index === activeStep ? content : null }
        </div> 
      </div>
    );
  }
  
  return (
    <div className={styles['steps']}>
      { steps.map(renderStep) }
    </div>
  );
}

export default CreatePlan;
