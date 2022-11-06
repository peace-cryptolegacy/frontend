import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItemTitle = ({ children, className }: Props) => {
  return <span className={clsx(className, 'h4')}>{children}</span>;
};

export default ListItemTitle;
