import clsx from 'clsx';
import Section from 'components/Section/Section';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ className, children }: Props) => {
  return (
    <Section className={clsx(className, 'w-full justify-center')}>
      {children}
    </Section>
  );
};

export default Container;
