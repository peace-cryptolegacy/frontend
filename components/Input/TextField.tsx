import clsx from 'clsx';

type Props = {
  startAdornment?: React.ReactNode;
  placeHolder?: string;
  className?: string;
  inputClassName?: string;
};

const TextField = ({
  startAdornment,
  className,
  inputClassName,
  placeHolder,
}: Props) => {
  return (
    <div className={clsx(className, 'relative w-full')}>
      <div
        className={clsx(
          startAdornment && 'pl-4',
          'pointer-events-none absolute inset-y-0 left-0 flex items-center'
        )}
      >
        {startAdornment}
      </div>
      <input
        type="text"
        id="main-search"
        className={clsx(
          inputClassName,
          startAdornment && 'pl-12',
          'rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900',
          'focus:border-blue-500 focus:ring-blue-500'
        )}
        placeholder={placeHolder}
        required
      />
    </div>
  );
};

export default TextField;
