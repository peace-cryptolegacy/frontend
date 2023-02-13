import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
} & React.ComponentPropsWithoutRef<'div'>;

const Section = ({ className, children, onClick, props }: Props) => {
  return (
    <div onClick={onClick} {...props} className={`flex  ${className || ''}`}>
      {children}
    </div>
  );
};

export default Section;
