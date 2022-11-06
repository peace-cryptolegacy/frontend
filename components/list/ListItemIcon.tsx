import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItemIcon = ({ children, className }: Props) => {
  return <div className={clsx(className, 'flex self-center')}>{children}</div>;
};

export default ListItemIcon;
