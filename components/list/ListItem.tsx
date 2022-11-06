import clsx from 'clsx';
import { HTMLProps } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  props?: HTMLProps<HTMLElement>;
};

const ListItem = ({ children, className, ...props }: Props) => {
  return (
    <li {...props} className={clsx(className, 'flex gap-10')}>
      {children}
    </li>
  );
};

export default ListItem;
