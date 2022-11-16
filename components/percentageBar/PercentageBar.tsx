import clsx from 'clsx';
import Stack from 'components/stack/Stack';

type Props = {
  name: string;
  percentage: number;
  className?: string;
};

const PercentageBar = ({ name, percentage, className }: Props) => {
  return (
    <div className="space-y-1">
      <Stack
        direction="row"
        className={clsx('mt-1 justify-between gap-4 text-sm', className)}
      >
        <span className="text-right">{name}</span>
        <span className="w-10 text-right text-blue-gray">{percentage}%</span>
      </Stack>
      <div
        // eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname
        className="h-2.5 rounded-xl bg-purple-900"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default PercentageBar;
