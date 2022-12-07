import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

const Tabs = ({ className, children }: Props) => {
  return (
    <Tab.List className={clsx('flex gap-8 capitalize', className)}>
      {children}
    </Tab.List>
  );
};

export default Tabs;
