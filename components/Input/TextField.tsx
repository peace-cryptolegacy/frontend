import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type Props = {
  startAdornment?: React.ReactNode | string;
  placeHolder?: string;
  className?: string;
  inputClassName?: string;
} & JSX.IntrinsicElements['input'];

const TextField = ({
  startAdornment,
  className,
  inputClassName,
  placeHolder,
  ...props
}: Props) => {
  return (
    <div className={clsx(className, 'relative w-full')}>
      <div
        className={clsx(
          startAdornment && 'pl-4',
          'pointer-events-none absolute inset-y-0 left-0 flex items-center'
        )}
      >
        {startAdornment === 'search' ? (
          <FontAwesomeIcon icon={'fa-solid fa-magnifying-glass' as IconProp} />
        ) : (
          startAdornment
        )}
      </div>
      <input
        type="text"
        id="main-search"
        className={clsx(
          inputClassName,
          startAdornment && 'pl-12',
          'w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900',
          'focus:border-blue-500 focus:ring-blue-500'
        )}
        placeholder={placeHolder}
        required
        {...props}
      />
    </div>
  );
};

export default TextField;
