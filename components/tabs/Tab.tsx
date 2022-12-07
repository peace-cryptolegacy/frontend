import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  underline?: boolean;
  className?: string;
  children: string;
};

const Tab = ({ underline = true, className, children }: Props) => {
  return (
    <HeadlessTab
      className={({ selected }) =>
        clsx(
          selected ? 'text-gradient' : 'text-blue-gray',
          // eslint-disable-next-line prettier/prettier
          ' relative block outline-none',
          className
        )
      }
    >
      {({ selected }) => (
        <>
          {children}
          {selected && underline && (
            // eslint-disable-next-line prettier/prettier
            <span className="absolute mt-3 block h-[3px] w-full bg-mainHorizontal"></span>
          )}
        </>
      )}
    </HeadlessTab>
  );
};
export default Tab;
