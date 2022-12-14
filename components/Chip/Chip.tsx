import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  variant?: 'success';
  icon?: JSX.Element;
  text: string;
  className?: string;
  children?: Node | Node[];
};

const Chip = ({ variant = 'success', icon, text, className }: Props) => {
  return (
    <div
      className={clsx(
        variant === 'success' && 'bg-green-500',
        'flex items-center rounded-md px-5 py-2',
        className
      )}
    >
      <span className="mr-2 capitalize">
        {icon}
        {variant === 'success' && (
          <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#fff' }} />
        )}
      </span>
      <span className="text-white">{text}</span>
    </div>
  );
};

export default Chip;
