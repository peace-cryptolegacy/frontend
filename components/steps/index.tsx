import classNames from 'classnames';
import styles from 'styles/Steps.module.scss';

const CreatePlan = () => {
  const steps = [
    {
      content: <div>adopakdkasodkasopdkasopdkpoas asdjopasdjopaskd</div>,
      title: 'Connect wallet & select network',
    },
    {
      content: <div>adopakdkasodkasopdkasopdkpoas asdjopasdjopaskd</div>,
      title: 'Select beneficiaries & proof of life',
    },
    {
      content: <div>adopakdkasodkasopdkasopdkpoas asdjopasdjopaskd</div>,
      title: 'Approve tokens  & distribution',
    },
    {
      content: <div>adopakdkasodkasopdkasopdkpoas asdjopasdjopaskd</div>,
      title: 'Review',
    }
  ];
  const activeStep = 0;

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
