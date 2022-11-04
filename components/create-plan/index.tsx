import Steps from 'components/steps';
import styles from 'styles/CreatePlan.module.scss';

const CreatePlan = () => {
  return (
    <div className={styles['createplan']}>
      <div className={styles['createplan__title']}>Create new plan</div>

      <Steps />
    </div>
  );
};

export default CreatePlan;
