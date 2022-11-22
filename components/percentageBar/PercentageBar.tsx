import clsx from 'clsx';
import Stack from 'components/stack/Stack';

type Props = {
  name?: string;
  percentage: number;
  showPercentage?: boolean;
  gradient?: boolean;
  className?: string;
};

const PercentageBar = ({
  name,
  percentage,
  showPercentage,
  className,
}: Props) => {
  return (
    <div className={clsx('space-y-1', className)}>
      <Stack direction="row" className="mt-1 justify-between gap-4 text-sm">
        <span className="text-right">{name}</span>
        {showPercentage && (
          <span className="w-10 text-right text-blue-gray">{percentage}%</span>
        )}
      </Stack>
      <div className="relative">
        <div className="absolute h-2.5 w-full rounded-xl bg-purple-500 opacity-20"></div>
        <div
          // eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname
          className="absolute h-2.5 rounded-xl bg-purple-900"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PercentageBar;
