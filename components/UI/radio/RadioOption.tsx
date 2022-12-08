import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import Stack from 'components/stack/Stack';
import { BigNumber } from 'ethers';

type Props = {
  value?: string | number | BigNumber;
  children?: string;
};

const RadioOption = ({ value, children }: Props) => {
  return (
    <RadioGroup.Option
      value={value}
      className={({ checked }) =>
        clsx(
          checked ? 'bg-purple-900 text-white' : 'bg-white',
          'w-full cursor-pointer rounded-lg py-4 shadow-md focus:outline-none'
        )
      }
    >
      {({ checked }) => (
        <Stack direction="row" className="relative justify-between">
          {checked && (
            <div className="absolute ml-4 shrink-0 text-white">
              <CheckIcon className="h-6 w-6" />
            </div>
          )}
          <div className="mx-auto">{children}</div>
        </Stack>
      )}
    </RadioGroup.Option>
  );
};

type IconProps = {
  className?: string;
};

function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RadioOption;
