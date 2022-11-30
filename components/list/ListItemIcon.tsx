import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItemIcon = ({ children, className }: Props) => {
  return (
    <picture className={clsx(className, 'flex self-center')}>
      {children}
    </picture>
  );
};

export default ListItemIcon;
