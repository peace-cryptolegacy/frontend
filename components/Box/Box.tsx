import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  className?: string;
};

const Box = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white py-7 px-9 drop-shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
