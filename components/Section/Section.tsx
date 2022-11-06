import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const Section = ({ className, children, props }: Props) => {
  return (
    <div {...props} className={`flex  ${className || ''}`}>
      {children}
    </div>
  );
};

export default Section;
